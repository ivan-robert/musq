import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { NotificationDTO } from "#modules/Profile/Notifications/infra/notifications.dto";
import { Logger } from "#shared/service/logger.service";

export const adaptNotification = (
  notification: NotificationDTO
): GenericNotification | null => {
  switch (notification?.data?.notifType) {
    case "follow":
      if (!notification.data.followed_by) {
        Logger.error("Missing followed_by field in follow notification");
        return null;
      }
      return {
        body: notification.body,
        created_at: notification.created_at,
        id: notification.id,
        read_at: notification.read_at,
        title: notification.title,
        user_id: notification.user_clerk_id,
        notifType: "follow",
        followed_by: notification.data.followed_by as string,
      };
    default:
      return null;
  }
};
