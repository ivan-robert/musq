import { MessageChannelsList } from "#modules/Profile/Params/Support/view/MessageChannelsList";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PlusIcon } from "#shared/icons/PlusIcon";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MessageChannelsListPage: React.FC = () => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <PageTemplate>
      <PageHeader
        headerText={t("settings.support")}
        onGoBackPress={() => navigate("AuthenticatedTabNavigator")}
      />
      <MessageChannelsList />
      <CreateNewIssueButton
        style={{ bottom: bottom + 16 }}
        onPress={() => {
          navigate("ContactSupportPage");
        }}
      >
        <PlusIcon height={32} width={32} color={theme.colors.text500} />
      </CreateNewIssueButton>
    </PageTemplate>
  );
};

const CreateNewIssueButton = styled.TouchableOpacity(({ theme }) => ({
  backgroundColor: theme.colors.CTA300,
  padding: 12,
  position: "absolute",
  right: 16,
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center",
}));
