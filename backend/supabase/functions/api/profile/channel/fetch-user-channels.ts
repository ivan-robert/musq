import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

type ChannelDTO = {
  channel_id: string;
  created_at: string;
  is_support: boolean;
  channel_name: string;
  creator_id: string;
  participants_names: string[];
};

export const fetch_user_channels: RequestHandler = async (req, user) => {
  const full_url = new URL(req.url);
  const channelMode = full_url.searchParams.get("mode") ?? "chat";
  const participants_map: Record<string, { id: string; name: string }[]> = {};

  const { data: participants, error } = await supabase_client
    .from("channels_participants")
    .select("*, profiles(*)")
    .eq("user_clerk_id", user.id)
    .throwOnError();

  if (!participants || error) {
    throw new Error("No participants found");
  }

  participants.forEach((participant) => {
    if (!participants_map[participant.channel_id]) {
      participants_map[participant.channel_id] = [];
    }

    participants_map[participant.channel_id].push({
      id: participant.user_clerk_id!,
      name: participant.profiles?.username ?? "unknown user",
    });
  });

  const { data: channels } = await supabase_client
    .from("channels")
    .select("*")
    .in("channel_id", Object.keys(participants_map))
    .throwOnError();

  const filteredChannels = (channels ?? []).filter((channel) => {
    if (channelMode === "chat") {
      return !channel?.is_support;
    } else {
      return channel?.is_support;
    }
  });

  const channelsDTO: ChannelDTO[] = filteredChannels.map((channel) => {
    return {
      channel_id: channel.channel_id,
      created_at: channel.created_at,
      is_support: channel.is_support ?? false,
      channel_name: channel.channel_name!,
      creator_id: channel.creator_clerk_id!,
      participants_names: participants_map[channel.channel_id].map(
        (participant) => participant.name
      ),
    };
  });

  return new Response(JSON.stringify(channelsDTO), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
