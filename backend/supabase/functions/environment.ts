const Env = {
  SUPABASE_SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY",
  SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY",
  SUPABASE_URL: "SUPABASE_URL",
  CLERK_SECRET_KEY: "CLERK_SECRET_KEY",
  CLERK_JWT_KEY: "CLERK_JWT_KEY",
  BASE_EXERCISE_URL: "BASE_EXERCISE_URL",
  EXERCISE_API_KEY: "EXERCISE_API_KEY",
  EXERCISE_API_HOST: "EXERCISE_API_HOST",
  EXPO_TOKEN: "EXPO_TOKEN",
  S3_ACCESS_KEY: "S3_ACCESS_KEY",
  S3_SECRET: "S3_SECRET",
} as const;

type EnvKey = keyof typeof Env;

export const getEnvVariable = (key: EnvKey): string => {
  // if (key === "SUPABASE_URL")
  //   return "https://07f5-2001-861-3186-3d90-a41c-1d4-4e8b-59b1.ngrok-free.app";
  const value = Deno.env.get(Env[key]);
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const SUPABASE_SERVICE_ROLE_KEY = getEnvVariable(
  "SUPABASE_SERVICE_ROLE_KEY"
);
export const SUPABASE_URL = getEnvVariable("SUPABASE_URL");
