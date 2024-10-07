import { SearchUsers } from "#modules/social/view/SearchUser";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { GoBackArrow } from "#shared/icons/GoBackArrow";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

export const SearchUserPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { goBack } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <PageTemplate topInsetColor={theme.colors.primary200}>
      <HeaderContainer>
        <Pressable
          onPress={() => {
            goBack();
          }}
        >
          <GoBackArrow width={24} />
        </Pressable>
        <Spacer.Horizontal gap={16} />
        <Typography.TextL.regular color={theme.colors.text500}>
          {t("profile:searchUser")}
        </Typography.TextL.regular>
      </HeaderContainer>
      <SearchUsers />
    </PageTemplate>
  );
};

const HeaderContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: theme.colors.primary200,
  padding: 8,
  paddingHorizontal: 16,
  borderBottomColor: theme.colors.black,
  borderBottomWidth: 1,
}));
