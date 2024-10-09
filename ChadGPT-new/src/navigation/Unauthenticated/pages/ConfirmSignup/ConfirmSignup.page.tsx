import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
import { ToastService } from "#shared/service/Toast.service";
import { Button } from "#shared/view/components/Button/Button";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSupabaseClient } from "#app/supabaseClient";

export const ConfirmSignupPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const { navigate } =
    useNavigation<NavigationProp<UnauthenticatedNavigatorStackParamList>>();
  const { params } =
    useRoute<
      RouteProp<UnauthenticatedNavigatorStackParamList, "SignupConfirmation">
    >();
  const supabaseClient = useSupabaseClient();

  const sendAgain = useCallback(async () => {
    supabaseClient.auth
      .resend({
        email: params.email,
        type: "signup",
      })
      .then(() => {
        ToastService.show({
          title: t("status.success"),
          type: "success",
          message: t("authentication.signupConfirmation.checkInbox"),
        });
      })
      .catch(() => {
        ToastService.show({
          title: t("status.error"),
          type: "error",
          message: t("status.networkError"),
        });
      });
  }, [params.email, supabaseClient.auth, t]);

  return (
    <PageTemplate>
      <Container>
        <Typography.TitleL.bold color={theme.colors.text500}>
          {t("authentication.signupConfirmation.title")}
        </Typography.TitleL.bold>
        <Typography.TextL.regular
          color={theme.colors.text500}
          style={{ textAlign: "center" }}
        >
          {t("authentication.signupConfirmation.message")}
        </Typography.TextL.regular>
        <Button.Secondary
          onPress={() => {
            navigate("Login");
          }}
          text={t("authentication.signupConfirmation.goBackToLogin")}
        />
        <Button.Tertiary
          onPress={sendAgain}
          text={t("authentication.signupConfirmation.sendAgain")}
        />
      </Container>
    </PageTemplate>
  );
};

const Container = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  padding: 16,
});
