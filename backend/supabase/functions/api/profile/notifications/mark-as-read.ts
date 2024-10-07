import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const markAsRead: RequestHandler = async (req, user, kwargs) => {
  const notificationId = kwargs.get("id") as string;
  await supabase_client
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId)
    .throwOnError();

  return new Response(null, { status: 204, statusText: "Marked as read" });
};

export const markAllAsRead: RequestHandler = async (req, user, kwargs) => {
  await supabase_client
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_clerk_id", user.id)
    .throwOnError();

  return new Response(null, { status: 204, statusText: "Marked all as read" });
};
