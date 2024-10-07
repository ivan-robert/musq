import { render } from "@testing-library/react-native";
import { ReactElement } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { darkTheme } from "../../src/theme/theme";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../src/shared/service/queryClient";
import { NavigationContainer } from "@react-navigation/native";

export const renderWithProviders = (children: ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <NavigationContainer>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
