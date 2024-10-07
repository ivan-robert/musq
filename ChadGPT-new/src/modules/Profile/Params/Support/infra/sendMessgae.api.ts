import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

type SendMessageArguments = {
  channelId: string;
  message: string;
};

export const sendMessage = async (
  supabaseClient: SupabaseClient,
  { channelId, message }: SendMessageArguments
) => {
  const { data } = await callEdgeFunction<Omit<MessageDTO, "username">>(
    supabaseClient,
    `api/profile/channel/${channelId}/send-message`,
    { method: "POST", body: { message } }
  );

  return data;
};
