import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { unReadCountAtom } from "#shared/store/notifications";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";

export const HomePageHeader: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <Container>
      <Typography.TitleM.regular color={theme.colors.text500}>
        {t("home")}
      </Typography.TitleM.regular>
      <Spacer.Flex />
      <NotificationBell />
      <Spacer.Horizontal gap={16} />
      <Pressable
        onPress={() => {
          navigate("SearchUsers");
        }}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Icon
          name="people"
          type="material"
          size={24}
          color={theme.colors.text500}
        />
      </Pressable>
    </Container>
  );
};

const NotificationBell = () => {
  const [unreadCount] = useAtom(unReadCountAtom);
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        navigate("Notifications");
      }}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <Icon
        name="notifications"
        type="material"
        size={24}
        color={theme.colors.text500}
      />
      {!!unreadCount && (
        <NotifCountContainer>
          <Text
            style={{
              color: theme.colors.text500,
              lineHeight: 8 * 1.2,
              fontSize: 8,
              fontFamily: theme.fonts["Montserrat-Bold"],
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Text>
        </NotifCountContainer>
      )}
    </Pressable>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderBottomColor: theme.colors.grey300,
  borderBottomWidth: 1,
  backgroundColor: theme.colors.primary500,
}));

const NotifCountContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.CTA500,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100,
  padding: 4,
  position: "absolute",
  right: 0,
  top: 0,
}));
