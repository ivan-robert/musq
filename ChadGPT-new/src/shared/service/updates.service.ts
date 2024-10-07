import { getEnvironment } from "#app/environment";
import { Logger } from "#shared/service/logger.service";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import * as Updates from "expo-updates";
import { useEffect } from "react";

export const UPDATE_KEY = "LAST_UPDATE_INSTALLATION";

const useAppUpdatesFunction = () => {
  const { downloadedUpdate, currentlyRunning } = Updates.useUpdates();

  useEffect(() => {
    try {
      Updates.fetchUpdateAsync();
    } catch (error) {
      Logger.error(`Error fetching latest Expo update: ${error}`);
    }
  }, []);

  useEffect(() => {
    const shouldAttemptUpdate =
      !!downloadedUpdate?.updateId &&
      !currentlyRunning.isEmergencyLaunch &&
      !currentlyRunning.isEmbeddedLaunch &&
      LocalStorage.getStringItem(UPDATE_KEY) !== downloadedUpdate.updateId;
    if (shouldAttemptUpdate) {
      try {
        LocalStorage.setStringItem(UPDATE_KEY, downloadedUpdate.updateId);
        Updates.reloadAsync();
      } catch (error) {
        Logger.error(`Error reloading latest Expo update: ${error}`);
      }
    }
  }, [
    currentlyRunning.isEmbeddedLaunch,
    currentlyRunning.isEmergencyLaunch,
    downloadedUpdate,
  ]);
};

export const useAppUpdates =
  getEnvironment() === "DEVELOPMENT" ? () => {} : useAppUpdatesFunction;
