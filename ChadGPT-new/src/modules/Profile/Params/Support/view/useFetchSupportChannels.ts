import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Channel,
  ChannelMode,
} from "#modules/Profile/Params/Support/domain/channel.types";
import { ChannelDTO } from "#modules/Profile/Params/Support/infra/channel.dto";
import { Logger } from "#shared/service/logger.service";
import { timestampzToDate } from "#shared/utils/dateConverter";
import { SupabaseClient } from "@supabase/supabase-js";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import axios from "axios";

export const useFetchSupportChannels = () => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUserContext();
  return useSuspenseQuery({
    queryKey: ["GET_SUPPORT_CHANNELS", user.id],
    queryFn: () => fetchChannelsConnector(supabaseClient, "support"),
    staleTime: 0,
  });
};

const adaptChannel = (channel: ChannelDTO): Channel => {
  return {
    id: channel.channel_id,
    createdAt: timestampzToDate(channel.created_at),
    name: channel.channel_name,
    mode: channel.is_support ? "support" : "chat",
    creatorId: channel.creator_id,
    participants_names: channel.participants_names,
  };
};

export const fetchChannelsConnector = async (
  supabaseClient: SupabaseClient,
  channelMode: ChannelMode
): Promise<Channel[]> => {
  const { data, error } = await callEdgeFunction<ChannelDTO[]>(
    supabaseClient,
    axios.getUri({
      url: "api/profile/user-channels",
      params: { mode: channelMode },
    }),
    { method: "GET" }
  );

  if (error) {
    Logger.error(`Error fetching channels: ${error.message}`);
    throw error;
  }

  const channels = data ?? [];
  return channels.map(adaptChannel);
};
