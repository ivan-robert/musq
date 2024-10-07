import { useSupabaseClient } from "#app/supabaseClient";
import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { adaptNotification } from "#modules/Profile/Notifications/infra/notifications.adapter";
import { subscribeToNotificationsAPI } from "#modules/Profile/Notifications/infra/notifications.api";
import { useUserContext } from "#modules/auth/context/User.context";
import { queryClient } from "#shared/service/queryClient";
import { notificationsAtom } from "#shared/store/notifications";
import { InfiniteData } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const useNotificationSubscription = async () => {
  const client = useSupabaseClient();
  const { user } = useUserContext();
  const setNotifs = useSetAtom(notificationsAtom);
  useEffect(() => {
    subscribeToNotificationsAPI(client, user.id, (payload) => {
      if (payload.eventType === "INSERT") {
        const adaptedNotif = adaptNotification(payload.new);
        if (!adaptedNotif) {
          return;
        }
        queryClient.setQueryData(
          ["FETCH_NOTIFICATIONS", user.id],
          (data: InfiniteData<GenericNotification[]>) => {
            return {
              ...data,
              pages: [
                [
                  adaptedNotif,
                  ...data.pages[0].filter(
                    (notif) => notif.id !== payload.new.id
                  ),
                ],
                ...data.pages.slice(1),
              ],
            };
          }
        );
        setNotifs((prev) => ({
          ...prev,
          [payload.new.id]: adaptedNotif,
        }));
      } else if (payload.eventType === "UPDATE") {
        const adaptedNotif = adaptNotification(payload.new);
        if (!adaptedNotif) {
          return;
        }
        setNotifs((prev) => ({
          ...prev,
          [payload.new.id]: adaptedNotif,
        }));
      }
    });
  }, [client, setNotifs, user.id]);
};
