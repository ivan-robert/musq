import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { MessageDTO } from "#functions/api/profile/types.ts";

export const channelStatus: RequestHandler = async (req, user, kwargs) => {
  const channel_id = kwargs.get("id") as string;

  const { data: last_message_info } = await supabase_client
    .from("messages")
    .select(`*, profiles(*)`)
    .eq("channel_id", channel_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .throwOnError();

  console.log("LAST MST INFO", last_message_info);

  if (!last_message_info) {
    return new Response("No messages found", { status: 404 });
  }

  const { data: last_read_message_data } = await supabase_client
    .from("channels_roles")
    .select("*")
    .eq("channel_id", channel_id)
    .eq("user_clerk_id", user.id)
    .throwOnError();

  let read_date = new Date(0).toISOString();

  if (!!last_read_message_data?.length) {
    const { data: masterclass } = await supabase_client
      .from("messages")
      .select("*")
      .eq("message_id", last_read_message_data[0].last_message_read!)
      .throwOnError();

    read_date = masterclass?.[0]?.created_at ?? new Date(0).toISOString();
  }

  console.log("LAST READ", last_read_message_data);

  const { data: unread_messages } = await supabase_client
    .from("messages")
    .select("*")
    .eq("channel_id", channel_id)
    .gt("created_at", read_date)
    .throwOnError();

  console.log("UNREAD", unread_messages);

  if (!unread_messages) {
    return new Response("No messages found", { status: 404 });
  }

  const response: {
    lastMessage: MessageDTO | null;
    unreadMessagesCount: number;
  } = {
    lastMessage: !!last_message_info.length
      ? {
          message_id: last_message_info[0].message_id,
          created_at: last_message_info[0].created_at,
          content: last_message_info[0].content,
          channel_id: last_message_info[0].channel_id,
          user_clerk_id: last_message_info[0].user_clerk_id!,
          username: last_message_info[0].profiles?.username ?? "Unknown user",
        }
      : null,
    unreadMessagesCount: unread_messages?.length ?? 0,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
