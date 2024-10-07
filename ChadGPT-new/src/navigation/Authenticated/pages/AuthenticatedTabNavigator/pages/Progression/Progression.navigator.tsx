import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "@emotion/react";
import { ExoStatsPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/pages/ExoStats/ExoStats.page";
import { ProgressionNavigatorStackParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/ProgressionNavigator.types";
import { ProgressionPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/pages/Progression.page";
import { MonthRecapPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/pages/MonthRecap.page";

const ProgressionStack =
  createNativeStackNavigator<ProgressionNavigatorStackParamList>();

export const ProgressionNavigator = () => {
  const theme = useTheme();

  return (
    <>
      <ProgressionStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
          navigationBarColor: theme.colors.black,
          contentStyle: {
            backgroundColor: theme.colors.black,
          },
        }}
      >
        <ProgressionStack.Screen
          name="ProgressionIndex"
          component={ProgressionPage}
        />
        <ProgressionStack.Screen name="ExoStats" component={ExoStatsPage} />
        <ProgressionStack.Screen name="MonthRecap" component={MonthRecapPage} />
      </ProgressionStack.Navigator>
    </>
  );
};
