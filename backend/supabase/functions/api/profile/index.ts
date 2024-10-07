import { Router } from "#shared/infra/server/router.ts";
import { isAuthenticated } from "#shared/infra/permissions/index.ts";
import { deleteUser } from "./delete-user/deleteUser.ts";
import { syncProfiles } from "./synchronize/syncProfiles.ts";
import { channelStatus } from "./channel/channelStatus.ts";
import { fetchMessages } from "./channel/fetch-messages.ts";
import { registerPushNotif } from "#functions/api/profile/notifications/register-push-notif.ts";
import { fetchNotifications } from "#functions/api/profile/notifications/fetch-notifications.ts";
import {
  markAllAsRead,
  markAsRead,
} from "#functions/api/profile/notifications/mark-as-read.ts";
import { sendMessage } from "#functions/api/profile/channel/send-message.ts";
import { create_channel } from "#functions/api/profile/channel/create.ts";
import { fetch_user_channels } from "#functions/api/profile/channel/fetch-user-channels.ts";
import { patchProfile } from "#functions/api/profile/patch.ts";

export const profileRouter = new Router("/api/profile");
profileRouter.register("DELETE", "/user", deleteUser, [isAuthenticated]);
profileRouter.register("POST", "/synchronize", syncProfiles, []);
profileRouter.register("PATCH", "/public", patchProfile, [isAuthenticated]);

profileRouter.register("GET", "/channel/:id:string/status", channelStatus, []);
profileRouter.register(
  "POST",
  "/channel/:id:string/send-message",
  sendMessage,
  []
);
profileRouter.register("POST", "/channel/create", create_channel, []);
profileRouter.register("GET", "/user-channels", fetch_user_channels, [
  isAuthenticated,
]);
profileRouter.register("POST", "/notifications/register", registerPushNotif, [
  isAuthenticated,
]);
profileRouter.register("POST", "/notifications", fetchNotifications, [
  isAuthenticated,
]);
profileRouter.register(
  "POST",
  "/notifications/:id:string/mark-as-read",
  markAsRead,
  [isAuthenticated]
);
profileRouter.register(
  "POST",
  "/notifications/mark-all-as-read",
  markAllAsRead,
  [isAuthenticated]
);
profileRouter.register(
  "GET",
  "/channel/:channel_id:string/messages",
  fetchMessages,
  [isAuthenticated]
);
