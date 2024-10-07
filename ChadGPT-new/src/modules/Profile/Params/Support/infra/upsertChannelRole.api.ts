import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "#shared/service/logger.service";

export const upsertChannelRoleAPI = async (
  supabaseClient: SupabaseClient,
  message_id: string,
  channel_id: string,
  user_id: string
) => {
  const { data, error } = await supabaseClient
    .from("channels_roles")
    .upsert([{ channel_id, user_id, last_message_read: message_id }])
    .eq("user_clerk_id", user_id)
    .eq("channel_id", channel_id)
    .select();

  if (error) {
    Logger.error(
      `Error upserting channel role for user ${user_id}: ${error.message}`
    );
    throw error;
  }

  if (!data) {
    throw new Error("Channel role not updated for user: " + user_id);
  }

  return data[0].channel_id;
};
