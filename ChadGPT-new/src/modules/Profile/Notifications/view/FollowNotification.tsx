import { FollowNotification as FollowNotificationType } from "#modules/Profile/Notifications/domain/notifications.types";
import { NotificationItemLayout } from "#modules/Profile/Notifications/view/NotificationItemLayout";
import { usePublicUser } from "#modules/social/view/usePublicUser";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";

import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/base";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

const timeAgo = (dateString: string): { tKey: string; count: number } => {
  const diff = DateTime.now()
    .diff(DateTime.fromISO(dateString), [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject();

  if (!diff) {
    return { tKey: "secondsAgo", count: 0 };
  }
  return diff.years && diff.years >= 1 // TODO USE TRANSLAIONS
    ? { tKey: "years", count: Math.floor(diff.years) }
    : diff.months && diff.months >= 1
    ? { tKey: "months", count: Math.floor(diff.months) }
    : diff.days && diff.days >= 1
    ? { tKey: "days", count: Math.floor(diff.days) }
    : diff.hours && diff.hours >= 1
    ? { tKey: "hours", count: Math.floor(diff.hours) }
    : diff.minutes && diff.minutes >= 1
    ? { tKey: "minutes", count: Math.floor(diff.minutes) }
    : { tKey: "seconds", count: Math.floor(diff.seconds ?? 0) };
};

export const FollowNotification: React.FC<{
  notification: FollowNotificationType;
}> = ({ notification }) => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const { data: profile } = usePublicUser(notification.followed_by);
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <NotificationItemLayout
      onPress={() => {
        navigate("PublicProfile", { userId: notification.followed_by });
      }}
      isRead={!!notification.read_at}
    >
      <ContentContainer>
        <Avatar source={{ uri: profile.profilePictureURL }} rounded size={32} />
        <Spacer.Horizontal gap={16} />
        <Typography.TextM.regular
          color={
            notification.read_at ? theme.colors.text200 : theme.colors.text500
          }
        >
          {notification.body}
        </Typography.TextM.regular>
      </ContentContainer>
      <Typography.TextS.regular color={theme.colors.text300}>
        {t(`notifications.timeAgo.${timeAgo(notification.created_at).tKey}`, {
          count: timeAgo(notification.created_at).count,
        })}
      </Typography.TextS.regular>
    </NotificationItemLayout>
  );
};

const ContentContainer = styled.View({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
});
