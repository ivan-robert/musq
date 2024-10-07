import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from "#app/constants";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Trans } from "react-i18next";
import { Linking } from "react-native";

export const PrivacyPolicyText = () => {
  const goToPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };
  const goToTermsOfService = () => {
    Linking.openURL(TERMS_OF_USE_URL);
  };
  const theme = useTheme();

  return (
    <Typography.TextS.regular
      color={theme.colors.grey200}
      style={{ textAlign: "center" }}
    >
      <Trans
        ns="common"
        i18nKey={"authentication.privacyPolicy"}
        components={{
          privacyPolicy: (
            <Typography.TextS.regular
              onPress={goToPrivacyPolicy}
              color={theme.colors.grey100}
              style={{ textDecorationLine: "underline" }}
            />
          ),
          termsOfService: (
            <Typography.TextS.regular
              onPress={goToTermsOfService}
              color={theme.colors.grey100}
              style={{ textDecorationLine: "underline" }}
            />
          ),
        }}
      />
    </Typography.TextS.regular>
  );
};
