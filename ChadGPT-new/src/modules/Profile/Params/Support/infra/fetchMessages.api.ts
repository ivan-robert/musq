import { SupabaseClient } from "@supabase/supabase-js";
import { Message } from "#modules/Profile/Params/Support/domain/message.types";
import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";
import { Logger } from "#shared/service/logger.service";
import { queryClient } from "#shared/service/queryClient";
import { InfiniteData } from "@tanstack/react-query";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import axios from "axios";

export const fetchMessageAPI = async (
  supabaseClient: SupabaseClient,
  messageId: string
): Promise<MessageDTO> => {
  const { data, error } = await supabaseClient
    .from("messages")
    .select()
    .eq("message_id", messageId);
  if (error) {
    Logger.error(`Error fetching message ${messageId}: ${error.message}`);
    throw error;
  }

  if (data.length === 0) {
    throw new Error("Message not found");
  }

  return data[0];
};

export const fetchMessagesAPI = async (
  supabaseClient: SupabaseClient,
  channelId: string,
  from: number,
  to: number
): Promise<MessageDTO[]> => {
  const { data, error } = await callEdgeFunction<MessageDTO[]>(
    supabaseClient,
    axios.getUri({
      url: `api/profile/channel/${channelId}/messages`,
      params: { offset: from, limit: to - from + 1 },
    }),
    { method: "GET" }
  );

  if (error) {
    Logger.error(`Error fetching messages: ${error.message}`);
    throw error;
  }

  if (!data) {
    throw new Error("No messages found");
  }

  return data;
};

type MessageUpdate =
  | {
      eventType: "INSERT";
      new: {
        channel_id: string;
        content: string;
        created_at: string;
        message_id: string;
        user_id: string;
      };
    }
  | {
      eventType: "DELETE";
      old: { message_id: string };
    };

type MessageUpdateCallback = (payload: MessageUpdate) => void;

export const subscribeToMessageAPI = (
  supabaseClient: SupabaseClient,
  channel_id: string,
  callback: MessageUpdateCallback
) => {
  supabaseClient
    .channel(`custom-filter-channel-${channel_id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `channel_id=eq.${channel_id}`,
      },
      (payload) => {
        callback(payload as unknown as MessageUpdate);
      }
    )
    .subscribe();
};

const insertMessage = async (
  supabaseClient: SupabaseClient,
  channel_id: string,
  user_id: string,
  updateEvent: MessageUpdate
) => {
  if (updateEvent.eventType === "INSERT") {
    const { data: sender_username } = await supabaseClient
      .from("profiles")
      .select("username")
      .eq("clerk_id", updateEvent.new.user_id);

    if (!sender_username || sender_username.length === 0) {
      throw new Error("User not found when fetching messages");
    }
    await queryClient.setQueryData(
      ["fetchMessages", channel_id],
      (data: InfiniteData<Message[], unknown>) => {
        const newMessage: Message = {
          content: updateEvent.new.content,
          creationDate: new Date(updateEvent.new.created_at),
          userId: updateEvent.new.user_id,
          messageId: updateEvent.new.message_id,
          userName: sender_username[0].username,
        };
        if (data.pages.length === 0) {
          return { pages: [[newMessage]] };
        }

        return {
          ...data,
          pages: [[newMessage, ...data.pages[0]], ...data.pages.slice(1)],
        };
      }
    );
  }
};

export const subscribeToMessageInChannelAPI = async (
  supabaseClient: SupabaseClient,
  channel_id: string,
  user_id: string
) => {
  subscribeToMessageAPI(supabaseClient, channel_id, (payload) => {
    insertMessage(supabaseClient, channel_id, user_id, payload);
  });
};

export const unsubscribeFromMessagesAPI = (
  supabaseClient: SupabaseClient,
  channel_id: string
) => {
  supabaseClient.channel(`custom-filter-channel-${channel_id}`).unsubscribe();
};
