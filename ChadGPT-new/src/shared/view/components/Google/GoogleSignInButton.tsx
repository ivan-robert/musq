import { ToastService } from "#shared/service/Toast.service";
import { Logger } from "#shared/service/logger.service";
import { useSignIn } from "@clerk/clerk-expo";
import { useSignUp } from "@clerk/clerk-react";
import {
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useTranslation } from "react-i18next";

export const GoogleButton = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { t } = useTranslation("common");

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={async () => {
        try {
          signIn?.create({
            strategy: "oauth_google",
            redirectUrl: "https://accounts.fitrat.fr/sign-in/",
          });
        } catch (error: any) {
          console.log(error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Logger.info("Google sign in cancelled");
          }
          if (error.code === statusCodes.IN_PROGRESS) {
            Logger.info("Google sign in in progress");
          }
          if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Logger.error(error);
            ToastService.show({
              type: "error",
              title: t("status.error"),
              message: t("authentication.errorWhileGoogleLogin"),
            });
          }
        }
      }}
    />
  );
};
