import { WebhookPayload } from "#functions/notifications/types.ts";
import { FollowData } from "#functions/notifications/follow_user/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const createFollowNotification = async (
  payload: WebhookPayload<FollowData>
) => {
  const { data } = await supabase_client
    .from("profiles")
    .select("username")
    .eq("id", payload.record.follower_clerk_id);
  const username = data?.[0].username as string;

  await supabase_client.from("notifications").insert([
    {
      title: "New follower 🎉!",
      body: `${username} followed you.`,
      user_clerk_id: payload.record.followed_clerk_id,
      created_at: new Date().toISOString(),
      data: {
        notifType: "follow",
        followed_by: payload.record.follower_clerk_id,
      },
    },
  ]);

  return new Response("Notification created", { status: 200 });
};
