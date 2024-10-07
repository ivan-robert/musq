import { adaptChannelStatus } from "#modules/Profile/Params/Support/infra/channelStatus.adapter";
import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

export const fetchChannelStatusConnector = async (
  supabaseClient: SupabaseClient,
  channel_id: string
) => {
  const { data, error } = await callEdgeFunction<{
    lastMessage: MessageDTO;
    unreadMessagesCount: number;
  }>(supabaseClient, `api/profile/channel/${channel_id}/status`, {
    method: "GET",
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No channel status found");
  }

  const channelStatus = data;

  return adaptChannelStatus(
    supabaseClient,
    channelStatus,
    channelStatus.lastMessage.user_clerk_id
  );
};
