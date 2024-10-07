import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

import { getEnvVar } from "./environment";

import * as Keychain from "react-native-keychain";
import { useSession } from "@clerk/clerk-expo";
import { Database } from "#app/database.types";

const KeychainAdapter = {
  getItem: async () => {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) return null;
    return credentials.password;
  },
  setItem: async (key: string, value: string) => {
    await Keychain.setGenericPassword(key, value);
  },
  removeItem: async () => {
    await Keychain.resetGenericPassword();
  },
};

export const useSupabaseClient = () => {
  const { session } = useSession();
  return createSupabaseClient(session);
};

const createSupabaseClient = (
  session: ReturnType<typeof useSession>["session"]
) =>
  createClient<Database>(getEnvVar("SUPABASE_URL"), getEnvVar("SUPABASE_KEY"), {
    global: {
      fetch: async (url, options = {}) => {
        const headers = new Headers(options?.headers);
        if (session) {
          const clerkToken = await session.getToken({
            template: getEnvVar("SUPABASE_URL").includes("ngrok")
              ? "supabase_development"
              : "supabase",
          });

          headers.set("Authorization", `Bearer ${clerkToken}`);
        }

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
    auth: {
      storage: KeychainAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
