import { useSupabaseClient } from "#app/supabaseClient";
import { GenericNotification } from "#modules/Profile/Notifications/domain/notifications.types";
import { markAllNotificationsAsReadAPI } from "#modules/Profile/Notifications/infra/notifications.api";
import { FollowNotification } from "#modules/Profile/Notifications/view/FollowNotification";
import { useFetchNotifications } from "#modules/Profile/Notifications/view/useFetchNotifications";
import { useUserContext } from "#modules/auth/context/User.context";
import { Logger } from "#shared/service/logger.service";
import { notificationsAtom } from "#shared/store/notifications";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

export const NotificationsList: React.FC = () => {
  const client = useSupabaseClient();
  const setNotifications = useSetAtom(notificationsAtom);
  const { user } = useUserContext();
  const [notificationsMap] = useAtom(notificationsAtom);
  const { data: notifs, fetchNextPage, isFetched } = useFetchNotifications();
  const allNotifs = notifs.pages.flat();

  useEffect(() => {
    return () => {
      markAllNotificationsAsReadAPI(client);
      setNotifications((prev) => {
        const updated = { ...prev };
        allNotifs.forEach((notif) => {
          updated[notif.id] = { ...notif, read_at: new Date().toISOString() };
        });
        return updated;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNotifications, user.id]);

  if (isFetched && allNotifs.length === 0) {
    return <NoNotificationsPlaceholder />;
  }

  return (
    <FlatList
      onEndReached={() => fetchNextPage()}
      data={allNotifs}
      ItemSeparatorComponent={() => <Spacer.Vertical gap={8} />}
      renderItem={({ item }) => {
        if (!notificationsMap[item.id]) {
          Logger.error(
            `Notification not found in map for item: ${JSON.stringify(item)}`
          );
        }
        return <RenderItem notif={notificationsMap[item.id] ?? item} />;
      }}
      contentContainerStyle={{
        padding: 16,
        paddingHorizontal: 8,
        flex: 1,
      }}
    />
  );
};

type RenderItemProps = {
  notif: GenericNotification;
};

const RenderItem = ({ notif }: RenderItemProps) => {
  if (notif.notifType === "follow") {
    return <FollowNotification key={notif.id} notification={notif} />;
  }
  return null;
};

const NoNotificationsPlaceholder: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CenteredView>
      <Typography.TextL.regular color={theme.colors.text500}>
        {t("common:notifications.noNotifications")}
      </Typography.TextL.regular>
    </CenteredView>
  );
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
