import { useSupabaseClient } from "#app/supabaseClient";
import { upsertChannelRoleAPI } from "#modules/Profile/Params/Support/infra/upsertChannelRole.api";
import { useUserContext } from "#modules/auth/context/User.context";
import { useMutation } from "@tanstack/react-query";

export const useUpsertChannelRole = (channelId: string) => {
  const client = useSupabaseClient();
  const { user } = useUserContext();
  return useMutation({
    mutationFn: async (message_id: string) =>
      upsertChannelRoleAPI(client, message_id, channelId, user.id),
    mutationKey: ["UPSERT_CHANNEL_ROLE", user.id, channelId],
  });
};
