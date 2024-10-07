import { UsersFollowed } from "#modules/social/view/UsersFollowed";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PlusIcon } from "#shared/icons/PlusIcon";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export const UsersFollowedPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("social");
  const { params } =
    useRoute<RouteProp<RootStackNavigatorParamList, "UsersFollowed">>();
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <PageTemplate topInsetColor={theme.colors.primary200}>
      <HeaderContainer>
        <Icon
          name="arrow-back"
          type="material"
          size={24}
          color={theme.colors.text500}
          onPress={goBack}
        />
        <Typography.TitleM.regular color={theme.colors.text500}>
          {t("social:usersFollowed")}
        </Typography.TitleM.regular>
        <Spacer.Flex />
        <TouchableOpacity
          onPress={() => {
            navigate("SearchUsers");
          }}
        >
          <PlusIcon height={24} width={24} color={theme.colors.text500} />
        </TouchableOpacity>
      </HeaderContainer>
      <UsersFollowed userId={params.userId} />
    </PageTemplate>
  );
};

const HeaderContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  backgroundColor: theme.colors.primary200,
  gap: 8,
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderBottomColor: theme.colors.grey300,
  borderBottomWidth: 1,
}));
