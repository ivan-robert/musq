import { AuthenticatedTabNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/authenticatedTabNavigator.types";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";

export type RootStackNavigatorParamList = {
  AuthenticatedTabNavigator:
    | { screen: keyof AuthenticatedTabNavigatorParamList }
    | undefined;
  AddExoPage: undefined;
  SeanceDetails: { seanceId: string };
  AddSeancePage:
    | { screen: keyof AddSeanceNavigatorParamList }
    | {
        screen: "enter-perf";
        params: AddSeanceNavigatorParamList["enter-perf"];
      }
    | {
        screen: "new-workout";
        params: { exosIdsForRedirect: string };
      }
    | undefined;
  SettingsPage: undefined;
  ContactSupportPage: undefined;
  MessageChannel: { channelId: string; channelName: string };
  MessageChannelsList: undefined;
  PublicProfile: { userId: string };
  SearchUsers: undefined;
  Comments: { postId: string };
  UsersFollowed: { userId: string };
  Notifications: undefined;
  "folder-content": { folderId: number };
  "post-details": { postId: string };
};
