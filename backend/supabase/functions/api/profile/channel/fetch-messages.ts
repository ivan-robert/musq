import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { MessageDTO } from "#functions/api/profile/types.ts";

export const fetchMessages: RequestHandler = async (req, user, kwargs) => {
  const channel_id = kwargs.get("channel_id") as string;
  const full_url = new URL(req.url);
  const limit = +(full_url.searchParams.get("limit") ?? "10");
  const offset = +(full_url.searchParams.get("offset") ?? "0");
  const { data: messages } = await supabase_client
    .from("messages")
    .select("*, profiles(*)")
    .eq("channel_id", channel_id)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (!messages) {
    return new Response("No messages found", { status: 404 });
  }

  const output: MessageDTO[] = messages.map((message) => ({
    channel_id: message.channel_id,
    content: message.content,
    created_at: message.created_at,
    message_id: message.message_id,
    user_clerk_id: message.user_clerk_id!,
    username: message.profiles?.username ?? "Unknown user",
  }));

  return new Response(JSON.stringify(output), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
