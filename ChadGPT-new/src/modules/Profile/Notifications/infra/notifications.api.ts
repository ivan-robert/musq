import { NotificationDTO } from "#modules/Profile/Notifications/infra/notifications.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

type NotificationUpdate =
  | {
      eventType: "INSERT";
      new: NotificationDTO;
    }
  | {
      eventType: "UPDATE";
      old: NotificationDTO;
      new: NotificationDTO;
    };

export const subscribeToNotificationsAPI = (
  supabaseClient: SupabaseClient,
  userId: string,
  callback: (payload: NotificationUpdate) => void
) => {
  supabaseClient
    .channel(`notifications-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `user_clerk_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload as unknown as NotificationUpdate);
      }
    )
    .subscribe();
};

export const unsubscribeFromNotificationsAPI = (
  supabaseClient: SupabaseClient,
  userId: string
) => {
  supabaseClient.channel(`notifications-${userId}`).unsubscribe();
};

export const markNotificationAsReadAPI = async (
  supabaseClient: SupabaseClient,
  notificationId: string
) => {
  const { data, error } = await callEdgeFunction(
    supabaseClient,
    `api/profile/notifications/${notificationId}/mark-as-read`
  );

  if (error) {
    throw error;
  }

  return data;
};

export const markAllNotificationsAsReadAPI = async (
  supabaseClient: SupabaseClient
) => {
  const { data, error } = await callEdgeFunction(
    supabaseClient,
    "api/profile/notifications/mark-all-as-read"
  );

  if (error) {
    throw error;
  }

  return data;
};
