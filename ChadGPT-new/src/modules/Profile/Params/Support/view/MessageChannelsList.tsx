import { useSupabaseClient } from "#app/supabaseClient";
import { Channel } from "#modules/Profile/Params/Support/domain/channel.types";
import {
  subscribeToMessageAPI,
  unsubscribeFromMessagesAPI,
} from "#modules/Profile/Params/Support/infra/fetchMessages.api";
import { useChannelStatus } from "#modules/Profile/Params/Support/view/useChannelStatus";
import { useFetchSupportChannels } from "#modules/Profile/Params/Support/view/useFetchSupportChannels";
import { useUserContext } from "#modules/auth/context/User.context";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DeviceEventEmitter, View } from "react-native";

export const MessageChannelsList = () => {
  const supabaseClient = useSupabaseClient();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  const { data: channels, isFetched } = useFetchSupportChannels();
  useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  if (channels.length === 0) {
    navigate("ContactSupportPage");
  }

  useEffect(() => {
    channels.forEach((channel) => {
      subscribeToMessageAPI(supabaseClient, channel.id, (payload) => {
        if (payload.eventType === "INSERT") {
          DeviceEventEmitter.emit(`REFRESH_CHANNEL_${channel.id}`);
        }
      });
    });

    return () => {
      channels.forEach((channel) => {
        unsubscribeFromMessagesAPI(supabaseClient, channel.id);
      });
    };
  }, [channels, supabaseClient]);

  if (channels.length === 0 && isFetched) {
    return <NoChannelsPlaceHolder />;
  }
  return (
    <ScrollView>
      {channels.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </ScrollView>
  );
};

type ChannelItemProps = {
  channel: Channel;
};

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const theme = useTheme();
  const { t } = useTranslation("profile");
  const { user } = useUserContext();
  const { data: channelStatus, refetch } = useChannelStatus(
    channel.id,
    user.id
  );

  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  useEffect(() => {
    const globalSubscription = DeviceEventEmitter.addListener(
      "REFRESH_CHANNELS",
      refetch
    );
    const subscription = DeviceEventEmitter.addListener(
      `REFRESH_CHANNEL_${channel.id}`,
      refetch
    );
    return () => {
      globalSubscription.remove();
      subscription.remove();
    };
  }, [refetch, channel.id]);

  return (
    <ChannelItemPressable
      key={channel.id}
      onPress={() =>
        navigate("MessageChannel", {
          channelId: channel.id,
          channelName: channel.name,
        })
      }
    >
      <>
        <ContentContainer>
          <Typography.TextM.bold>{channel.name}</Typography.TextM.bold>
          <Spacer.Vertical gap={4} />
          <View style={{ flexDirection: "row" }}>
            <Trans
              ns="profile"
              i18nKey="author"
              parent={Typography.TextS.regular}
              components={{ bold: <Typography.TextS.bold /> }}
              values={{
                author:
                  channelStatus.lastMessage.userId === user.id
                    ? t("you")
                    : channelStatus.lastMessage.userName,
              }}
            />
            <Typography.TextS.regular numberOfLines={1}>
              {channelStatus.lastMessage.content}
            </Typography.TextS.regular>
          </View>
        </ContentContainer>
        <Spacer.Flex />
        {channelStatus.unreadMessagesCount > 0 && (
          <NewMessageCountContainer>
            <Typography.TextS.regular color={theme.colors.text500}>
              {channelStatus.unreadMessagesCount}
            </Typography.TextS.regular>
          </NewMessageCountContainer>
        )}
        <Spacer.Horizontal gap={4} />
        <ShowArrowIcon height={16} width={16} />
      </>
    </ChannelItemPressable>
  );
};

const NoChannelsPlaceHolder: React.FC = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  return (
    <CenteredView>
      <Typography.TextL.regular color={theme.colors.text500}>
        {t("settings.noIssueOpen")}
      </Typography.TextL.regular>
      <Spacer.Vertical gap={16} />
      <Button
        onPress={() => navigate("ContactSupportPage")}
        radius={16}
        color={theme.colors.CTA500}
      >
        <Typography.TextS.regular color={theme.colors.text500}>
          {t("settings.openIssue")}
        </Typography.TextS.regular>
      </Button>
    </CenteredView>
  );
};

const ChannelItemPressable = styled.Pressable(({ theme }) => ({
  flexDirection: "row",
  padding: 16,
  backgroundColor: theme.colors.white,
  alignItems: "center",
  borderBottomColor: theme.colors.primary200,
  borderBottomWidth: 3,
}));

const NewMessageCountContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.secondary500,
  borderRadius: 100,
  minWidth: 24,
  padding: 4,
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.colors.secondary200,
}));

const ContentContainer = styled.View({});

const CenteredView = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});
