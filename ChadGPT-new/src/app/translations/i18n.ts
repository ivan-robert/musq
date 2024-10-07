import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
// this is bugged, returns "en-FR". For now not enabling it
// import { ReactNativeLanguageDetector } from "react-native-localization-settings";
import resources from "#app/translations/locales";
import { getEnvironment } from "#app/environment";

const i18nextOptions: InitOptions = {
  debug: getEnvironment() === "DEVELOPMENT",
  defaultNS: "common",
  fallbackLng: ["en", "fr"],
  react: {
    useSuspense: true,
  },
  resources,
};

export const initializeTranslations = async () => {
  return await i18next
    .use(initReactI18next)
    // .use(ReactNativeLanguageDetector)
    .init(i18nextOptions);
};
