import { supabase_client } from "#shared/client/supabaseClient.ts";
import { getEnvVariable } from "#functions/environment.ts";
import { NotificationObject } from "#functions/notifications/send/types.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";

export const sendNotifications = async (
  notification: Omit<Tables<"notifications">, "id">
) => {
  const { data: target_user_profile, error } = await supabase_client
    .from("private_profiles")
    .select("*")
    .eq("clerk_user_id", notification.user_clerk_id);

  if (error) {
    console.error(error);
    throw error;
  }

  if (
    !target_user_profile ||
    target_user_profile.length === 0 ||
    !target_user_profile[0].expo_push_token
  ) {
    return new Response("No target tokens found", { status: 404 });
  }

  const notificationToSend: NotificationObject = {
    body: notification.body ?? "",
    title: notification.title ?? "",
    to: target_user_profile[0].expo_push_token,
    sound: "default",
  };

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getEnvVariable("EXPO_TOKEN")}`,
    },
    body: JSON.stringify(notificationToSend),
  });

  return new Response(JSON.stringify(res), { status: res.status ?? 500 });
};
