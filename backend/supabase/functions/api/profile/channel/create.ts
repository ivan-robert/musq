import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const create_channel: RequestHandler = async (req, user, kwargs) => {
  const { channel_name, is_support } = await req.json();

  const { data, error } = await supabase_client
    .from("channels")
    .insert({
      channel_name,
      creator_id: user.id,
      is_support: is_support || false,
    })
    .select("*")
    .single();

  if (!data) {
    throw new Error("Channel not created");
  }

  await supabase_client.from("channels_participants").insert({
    channel_id: data.channel_id,
    user_clerk_id: user.id,
  });

  await supabase_client.from("channels_roles").insert({
    channel_id: data.channel_id,
    user_clerk_id: user.id,
  });

  return new Response(data.channel_id, {
    status: 201,
    statusText: "Channel created",
  });
};
