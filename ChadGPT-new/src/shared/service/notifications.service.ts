import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import { callEdgeFunction } from "#shared/infra/requestHandler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface INotificationsService {
  registerForPushNotifications: (
    supabaseClient: SupabaseClient
  ) => Promise<void>;
  askForNotificationPermission: () => Promise<Notifications.PermissionStatus>;
}

async function askForNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus;
  }
  return status;
}

function handleRegistrationError(errorMessage: string) {
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    handleRegistrationError("Project ID not found");
  }
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    return pushTokenString;
  } catch (e: unknown) {
    handleRegistrationError(`${e}`);
  }
}

const registerForPushNotifications = async (supabaseClient: SupabaseClient) => {
  const token = await registerForPushNotificationsAsync();
  if (!token) {
    return;
  }
  const { error } = await callEdgeFunction(
    supabaseClient,
    `api/profile/notifications/register`,
    { body: { expo_push_token: token } }
  );

  if (error) {
    throw error;
  }
};

export const NotificationsService: INotificationsService = {
  registerForPushNotifications,
  askForNotificationPermission,
};
