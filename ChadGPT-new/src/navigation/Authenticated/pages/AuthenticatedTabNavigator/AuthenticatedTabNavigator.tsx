import { Homepage } from "./pages/Homepage/Home.page";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PaperIcon from "../../../../shared/icons/PaperIcon";
import { useTheme } from "@emotion/react";
import { HomeIcon } from "../../../../shared/icons/HomeIcon";
import styled from "@emotion/native";
import { AuthenticatedTabNavigatorParamList } from "./authenticatedTabNavigator.types";
import { ProfilePage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Profile/Profile.page";
import { UserIcon } from "#shared/icons/UserIcon";
import { StonksIcon } from "#shared/icons/StonksIcon";
import { ReadSeancesPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Seances/ReadSeances.page";
import { Dimensions, Pressable, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ProgressionNavigator } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/Progression.navigator";

import { useFetchNotifications } from "#modules/Profile/Notifications/view/useFetchNotifications";
import { useNotificationSubscription } from "#modules/Profile/Notifications/view/useNotificationsSubscription";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { useState } from "react";
import {
  retrieveOngoingWorkout,
  useOngoingWorkout,
} from "#shared/utils/useOngoingWorkout";
import { Icon } from "@rneui/base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

const MainTabNavigator =
  createBottomTabNavigator<AuthenticatedTabNavigatorParamList>();

export const AuthenticatedTabNavigator = () => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  useFetchNotifications();
  useNotificationSubscription();

  return (
    <BackgroundContainer>
      <MainTabNavigator.Navigator
        initialRouteName="Homepage"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarVisibilityAnimationConfig: {
            hide: { animation: "spring", config: { bounciness: 200 } },
            show: { animation: "spring", config: { bounciness: 200 } },
          },
          tabBarBackground: () => (
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: theme.colors.primary300,
                borderWidth: 1,
                borderColor: theme.colors.text300,
                borderRadius: 16,
              }}
            />
          ),

          tabBarStyle: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderRadius: 8,
            paddingBottom: 4,
            paddingTop: 4,
            marginBottom: bottom + 16,
            marginHorizontal: 16,
            position: "absolute",
          },
        }}
      >
        <MainTabNavigator.Screen
          name="Homepage"
          component={Homepage}
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon
                color={focused ? theme.colors.CTA300 : theme.colors.text500}
              />
            ),
          }}
        />

        <MainTabNavigator.Screen
          name="Seances"
          component={ReadSeancesPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <PaperIcon
                color={focused ? theme.colors.CTA300 : theme.colors.text500}
              />
            ),
          }}
        />

        <MainTabNavigator.Screen
          name="AddSeance"
          component={HomeRedirection}
          options={{
            tabBarButton: () => <PlusIconButton />,
          }}
        />

        <MainTabNavigator.Screen
          name="Progression"
          component={ProgressionNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <StonksIcon
                color={focused ? theme.colors.CTA300 : theme.colors.text500}
              />
            ),
          }}
        />
        <MainTabNavigator.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <UserIcon
                color={focused ? theme.colors.CTA300 : theme.colors.text500}
              />
            ),
          }}
        />
      </MainTabNavigator.Navigator>
    </BackgroundContainer>
  );
};

const HomeRedirection = () => {
  const { navigate } =
    useNavigation<NavigationProp<AuthenticatedTabNavigatorParamList>>();
  navigate("Homepage");
  return null;
};

const PlusIconButton = () => {
  const theme = useTheme();
  const { removeOngoingWorkout } = useOngoingWorkout();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const handlePress = () => {
    const workout = retrieveOngoingWorkout();
    if (!workout) return navigate("AddSeancePage");
    setShowRestoreModal(true);
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? theme.colors.CTA500 : theme.colors.CTA300,
          padding: 4,
          borderRadius: 16,
          width: width / 6,
          justifyContent: "center",
        })}
        onPress={handlePress}
      >
        <Icon name="add" color={theme.colors.white} size={24} />
      </Pressable>
      <ConfirmationModal
        cancelLabel="No"
        confirmLabel="Yes"
        description="It appears you have an unsaved workout. Would you like to restore it ?"
        isVisble={showRestoreModal}
        onCancel={() => {
          removeOngoingWorkout();
          setShowRestoreModal(false);
        }}
        onConfirm={() => {
          setShowRestoreModal(false);
          navigate("AddSeancePage", { screen: "new-workout" });
        }}
        title="Restore workout"
      />
    </>
  );
};

const BackgroundContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.neutral,
  flex: 1,
}));
