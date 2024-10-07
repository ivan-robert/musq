import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackNavigatorParamList } from "./rootStackNavigator.types";

import { AddExoPage } from "./pages/AddExo/AddExo.page";
import { SeanceDetailsPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Seances/SeanceDetails.page";
import { useTheme } from "@emotion/react";
import { AuthenticatedTabNavigator } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/AuthenticatedTabNavigator";
import { SettingsPage } from "#navigation/Authenticated/pages/Settings/Settings.page";
import { ContactSupportPage } from "#navigation/Authenticated/pages/ContactSupport/ContactSupport.page";
import { MessageChannelPage } from "#navigation/Authenticated/pages/MessageChannel/MessageChannel.page";
import { MessageChannelsListPage } from "#navigation/Authenticated/pages/MessageChannelsList/MessageChannelsList.page";
import { PublicProfilePage } from "#navigation/Authenticated/pages/PublicProfile/PublicProfile.page";
import { SearchUserPage } from "#navigation/Authenticated/pages/SearchUser/SearchUser.page";
import { CommentsPage } from "#navigation/Authenticated/pages/Comments/Comments.page";
import { UsersFollowedPage } from "#navigation/Authenticated/pages/UsersFollowed/UsersFollowed.page";
import { NotificationsPage } from "#navigation/Authenticated/pages/Notifications/Notifications.page";
import { featureFlags } from "#app/featureFlags";
import { AddWorkoutNavigator } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeance.navigator";
import { FolderContentEditionPage } from "#navigation/Authenticated/pages/folder-content/FolderContentEdition.page";
import { PostDetailsPage } from "#navigation/Authenticated/pages/post-details/PostDetails.page";
import { useSupabaseClient } from "#app/supabaseClient";
import { useEffect } from "react";

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

export const RootNavigator = () => {
  const theme = useTheme();
  const supabaseClient = useSupabaseClient();
  useEffect(() => {
    return () => {
      supabaseClient.removeAllChannels();
    };
  }, [supabaseClient]);

  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: theme.colors.black,
          contentStyle: {
            backgroundColor: theme.colors.black,
          },
        }}
      >
        <RootStack.Screen
          name="AuthenticatedTabNavigator"
          component={AuthenticatedTabNavigator}
        />
        <RootStack.Screen name="AddExoPage" component={AddExoPage} />
        <RootStack.Screen
          name="Notifications"
          component={NotificationsPage}
          options={{ animation: "fade_from_bottom" }}
        />
        <RootStack.Screen name="SeanceDetails" component={SeanceDetailsPage} />
        {featureFlags.newAddFlow && (
          <RootStack.Screen
            name="AddSeancePage"
            component={AddWorkoutNavigator}
            options={{ animation: "slide_from_bottom" }}
          />
        )}
        <RootStack.Screen name="SettingsPage" component={SettingsPage} />
        <RootStack.Screen
          name="ContactSupportPage"
          component={ContactSupportPage}
          options={{ animation: "fade_from_bottom" }}
        />
        <RootStack.Screen
          name="MessageChannel"
          component={MessageChannelPage}
        />
        <RootStack.Screen
          name="MessageChannelsList"
          component={MessageChannelsListPage}
        />
        <RootStack.Screen name="PublicProfile" component={PublicProfilePage} />
        <RootStack.Screen
          name="SearchUsers"
          component={SearchUserPage}
          options={{ animation: "fade" }}
        />
        <RootStack.Screen
          name="Comments"
          component={CommentsPage}
          options={{ animation: "slide_from_bottom" }}
        />
        <RootStack.Screen name="UsersFollowed" component={UsersFollowedPage} />
        <RootStack.Screen
          name="folder-content"
          component={FolderContentEditionPage}
        />
        <RootStack.Screen name="post-details" component={PostDetailsPage} />
      </RootStack.Navigator>
    </>
  );
};
