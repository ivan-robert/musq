import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const fetchNotifications: RequestHandler = async (req, user, kwargs) => {
  const full_url = new URL(req.url);
  const limit = +(full_url.searchParams.get("limit") ?? "10");
  const offset = +(full_url.searchParams.get("offset") ?? "0");
  const { data: notifications } = await supabase_client
    .from("notifications")
    .select("*")
    .eq("user_clerk_id", user.id)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (!notifications) {
    return new Response("No notifications found", { status: 404 });
  }

  return new Response(JSON.stringify(notifications), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
