import { ToastService } from "#shared/service/Toast.service";
import Constants from "expo-constants";

type Environment = "DEVELOPMENT" | "PRODUCTION" | "STAGING";

const VAR_KEYS = [
  "SUPABASE_URL",
  "SUPABASE_KEY",
  "ENVIRONMENT",
  "BASE_EXERCISE_URL",
  "EXERCISE_API_KEY",
  "EXERCISE_API_HOST",
  "GOOGLE_IOS_CLIENT_ID",
  "GOOGLE_WEB_CLIENT_ID",
  "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "S3_ACCESS_KEY",
  "S3_SECRET",
] as const;

type VarKey = (typeof VAR_KEYS)[number];

export const getEnvironment = (): Environment => {
  const environment =
    Constants.expoConfig?.extra?.ENVIRONMENT ?? process.env.ENV;
  if (environment === "development") {
    return "DEVELOPMENT";
  }
  if (environment === "staging") {
    return "STAGING";
  }
  return "PRODUCTION";
};

export const getEnvVar = (key: VarKey): string => {
  const value = Constants.expoConfig?.extra?.[key];
  // if (key === "SUPABASE_URL") {
  //   return "https://8927-138-195-42-31.ngrok-free.app";
  // }
  // if (key === "SUPABASE_KEY") {
  //   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
  // }

  if (!value) {
    throw new Error(`Missing ${key} environment variable`);
  }
  return value;
};

export const getAppVersion = (): string => {
  if (!Constants.manifest2?.runtimeVersion) {
    ToastService.show({
      type: "error",
      title: "Error",
      message: "App version not found",
    });
    return "0.0.0";
  }
  return Constants.manifest2?.runtimeVersion;
};

export const API_URL = `${getEnvVar("SUPABASE_URL")}/functions/v1/api`;
