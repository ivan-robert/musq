import { supabase_client } from "#shared/client/supabaseClient.ts";
import { RequestHandler } from "#shared/infra/server/types.ts";

export const sendMessage: RequestHandler = async (req, user, kwargs) => {
  const id = kwargs.get("id") as string;
  const { message } = (await req.json()) as { message: string };
  if (!message) {
    return new Response("Message is required", { status: 400 });
  }
  const { data } = await supabase_client
    .from("messages")
    .insert({ content: message, channel_id: id, user_clerk_id: user.id })
    .select()
    .single()
    .throwOnError();

  if (!data) {
    throw new Error("Message not created");
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
