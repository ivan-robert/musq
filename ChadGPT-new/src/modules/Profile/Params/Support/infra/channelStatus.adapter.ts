import { SupabaseClient } from "@supabase/supabase-js";
import { ChannelStatus } from "#modules/Profile/Params/Support/domain/channel.types";
import { ChannelStatusDTO } from "#modules/Profile/Params/Support/infra/channelStatus.dto";
import { adaptMessage } from "#modules/Profile/Params/Support/infra/message.adapter";
import { Logger } from "#shared/service/logger.service";

export const adaptChannelStatus = async (
  supabaseClient: SupabaseClient,
  channelStatusDTO: ChannelStatusDTO,
  sender_id: string
): Promise<ChannelStatus> => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("username")
    .eq("clerk_id", sender_id);

  if (error) {
    Logger.error("Error fetching user", JSON.stringify(error));
    throw error;
  }
  if (data.length === 0) {
    throw new Error("User not found with id: " + sender_id);
  }
  const user_name = data[0].username;
  return {
    unreadMessagesCount: channelStatusDTO.unreadMessagesCount,
    lastMessage: adaptMessage(channelStatusDTO.lastMessage, user_name),
  };
};
