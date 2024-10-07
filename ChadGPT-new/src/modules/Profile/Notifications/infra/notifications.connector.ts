import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { adaptNotification } from "#modules/Profile/Notifications/infra/notifications.adapter";
import { NotificationDTO } from "#modules/Profile/Notifications/infra/notifications.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export const notificationsConnector = async (
  client: SupabaseClient,
  user_id: string,
  offset: number,
  limit: number
): Promise<GenericNotification[]> => {
  const { data, error } = await callEdgeFunction<NotificationDTO[]>(
    client,
    axios.getUri({
      url: "api/profile/notifications",
      params: { offset, limit },
    })
  );

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const notifications = data;

  return notifications
    .map(adaptNotification)
    .filter((notif) => !!notif) as GenericNotification[];
};
