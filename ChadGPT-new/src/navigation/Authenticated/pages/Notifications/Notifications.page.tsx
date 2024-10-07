import { NotificationsList } from "#modules/Profile/Notifications/view/NotificationsList";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const NotificationsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { goBack } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <PageTemplate type="page">
      <PageHeader
        headerText={t("notifications.notifications")}
        onCrossIconPress={goBack}
      />
      <Container>
        <NotificationsList />
      </Container>
    </PageTemplate>
  );
};

const Container = styled.View({
  flex: 1,
});
