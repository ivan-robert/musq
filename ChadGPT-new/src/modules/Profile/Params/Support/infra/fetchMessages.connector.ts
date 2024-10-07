import { Message } from "#modules/Profile/Params/Support/domain/message.types";
import { fetchMessagesAPI } from "#modules/Profile/Params/Support/infra/fetchMessages.api";
import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";
import { timestampzToDate } from "#shared/utils/dateConverter";
import { SupabaseClient } from "@supabase/supabase-js";

const fetchMessagesAdapter = (message: MessageDTO): Message => {
  return {
    creationDate: timestampzToDate(message.created_at),
    content: message.content,
    userName: message.username,
    userId: message.user_clerk_id,
    messageId: message.message_id,
  };
};

export const fetchMessagesConnector = async (
  supabaseClient: SupabaseClient,
  channelId: string,
  minIndex: number,
  maxIndex: number
): Promise<Message[]> => {
  const messages: MessageDTO[] = await fetchMessagesAPI(
    supabaseClient,
    channelId,
    minIndex,
    maxIndex
  );

  return messages.map(fetchMessagesAdapter);
};
