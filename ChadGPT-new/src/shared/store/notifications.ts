import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { PrimitiveAtom, atom } from "jotai";

type NotificationsMap = Record<string, GenericNotification>;

export const notificationsAtom: PrimitiveAtom<NotificationsMap> = atom({});
export const unReadCountAtom = atom(
  (get) =>
    Object.values(get(notificationsAtom)).filter((notif) => !notif.read_at)
      .length
);
