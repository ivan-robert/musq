const notifTypes = ["follow"] as const;
type NotificationType = (typeof notifTypes)[number];

type BaseNotification = {
  notifType: NotificationType;
  id: string;
  created_at: string;
  user_id: string;
  read_at: string | null;
  title: string;
  body: string;
};

export type FollowNotification = {
  notifType: "follow";
  followed_by: string;
} & BaseNotification;

export type GenericNotification = FollowNotification;
