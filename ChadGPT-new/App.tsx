import React, { Suspense, useEffect, useState } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthenticationSwitch } from "./src/navigation/AuthenticationSwitch";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/shared/service/queryClient";
import * as SplashScreen from "expo-splash-screen";
import { useLoadFonts } from "./src/theme/useLoadFonts";
import "react-native-reanimated";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import "intl-pluralrules";
import { initializeTranslations } from "#app/translations/i18n";
import i18next from "i18next";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import { Provider, useAtom } from "jotai";
import { Logger } from "#shared/service/logger.service";
import { useAppUpdates } from "#shared/service/updates.service";
import { getTheme, themeAtom } from "#shared/store/theme";
import { NavigationContainer } from "@react-navigation/native";
import { Apploader } from "#shared/view/components/AppLoader";
import { ErrorBoundary } from "#shared/view/components/QueryBoundaries";
import { getEnvVar } from "#app/environment";
import { clerkTokenCache } from "#modules/auth/infra/token";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill";

if (typeof global.ReadableStream === "undefined") {
  // @ts-expect-error -- yessai
  global.ReadableStream = ReadableStream;
}

export default function App() {
  const { areFontsLoaded } = useLoadFonts();
  const [areTranslationsReady, setAreTranslationsReady] = useState(false);

  useAppUpdates();

  useEffect(() => {
    if (!areTranslationsReady) {
      try {
        initializeTranslations().then(() => {
          setAreTranslationsReady(true);
          const storedLanguage = LocalStorage.getStringItem("language");
          if (storedLanguage) {
            i18next.changeLanguage(storedLanguage);
          }
        });
      } catch (error) {
        Logger.error((error as Error).message);
      }
    }

    if (areFontsLoaded && areTranslationsReady) {
      SplashScreen.hideAsync();
    }
  }, [areFontsLoaded, areTranslationsReady]);

  if (!areFontsLoaded || !areTranslationsReady) {
    return null;
  }
  return (
    <ClerkProvider
      tokenCache={clerkTokenCache}
      publishableKey={getEnvVar("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY")}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <EnhancedThemeProvider>
              <NavigationContainer>
                <ErrorBoundary>
                  <Suspense fallback={<Apploader />}>
                    <SafeAreaProvider>
                      <ToastWrapper>
                        <AuthenticationSwitch />
                      </ToastWrapper>
                    </SafeAreaProvider>
                  </Suspense>
                </ErrorBoundary>
              </NavigationContainer>
            </EnhancedThemeProvider>
          </Provider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      {children}
      <Toast topOffset={top} />
    </>
  );
};

type EnhancedThemeProviderProps = {
  children: React.ReactNode;
};

const EnhancedThemeProvider = ({ children }: EnhancedThemeProviderProps) => {
  const [theme] = useAtom(themeAtom);
  return <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>;
};
