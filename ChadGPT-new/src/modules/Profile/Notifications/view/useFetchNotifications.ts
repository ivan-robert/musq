import { useSupabaseClient } from "#app/supabaseClient";
import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { notificationsConnector } from "#modules/Profile/Notifications/infra/notifications.connector";
import { useUserContext } from "#modules/auth/context/User.context";
import { notificationsAtom } from "#shared/store/notifications";
import { SupabaseClient } from "@supabase/supabase-js";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

const PAGE_SIZE = 100;

const fetch = async (
  client: SupabaseClient,
  page: number,
  user_id: string
): Promise<GenericNotification[]> => {
  const notifPage = await notificationsConnector(
    client,
    user_id,
    (page - 1) * PAGE_SIZE,
    PAGE_SIZE
  );

  return notifPage;
};

export const useFetchNotifications = () => {
  const client = useSupabaseClient();
  const setNotifs = useSetAtom(notificationsAtom);
  const { user } = useUserContext();
  const query = useInfiniteQuery({
    queryKey: ["FETCH_NOTIFICATIONS", user.id],
    queryFn: async ({ pageParam }) => {
      const notifs = await fetch(client, pageParam, user.id);
      notifs.forEach((notif) => {
        setNotifs((prev) => ({
          ...prev,
          [notif.id]: notif,
        }));
      });

      return notifs;
    },

    getNextPageParam: (lastPage: GenericNotification[], pages) => {
      if (!lastPage) {
        return 1;
      }
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage: GenericNotification[], pages) => {
      if (!firstPage) {
        return undefined;
      }
      if (firstPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length - 1;
    },
    initialPageParam: 1,
    initialData: { pageParams: [1], pages: [] },
    refetchOnMount: "always",
  });
  return query;
};
