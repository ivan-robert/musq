import { useSupabaseClient } from "#app/supabaseClient";
import { fetchChannelStatusConnector } from "#modules/Profile/Params/Support/infra/fetchChannelStatus.connector";
import { useSuspenseQuery } from "@tanstack/react-query";

const getChannelDetailsQueryKey = (channel_id: string, user_id: string) => {
  return ["channelDetails", channel_id, user_id];
};

export const useChannelStatus = (channel_id: string, user_id: string) => {
  const client = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: getChannelDetailsQueryKey(channel_id, user_id),
    queryFn: async () => await fetchChannelStatusConnector(client, channel_id),
    staleTime: 0,
  });
};
