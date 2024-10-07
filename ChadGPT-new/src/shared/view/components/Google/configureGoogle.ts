import { getEnvVar } from "#app/environment";
import { Logger } from "#shared/service/logger.service";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const configureGoogle = () => {
  try {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId: getEnvVar("GOOGLE_WEB_CLIENT_ID"),
      iosClientId: getEnvVar("GOOGLE_IOS_CLIENT_ID"),
    });
    return true;
  } catch (e) {
    Logger.error(e as string);
    return false;
  }
};
