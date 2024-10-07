import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "#shared/service/logger.service";
import { callEdgeFunction } from "#shared/infra/requestHandler";

export const setUsernameAPI = async (
  supabaseClient: SupabaseClient,
  username: string
) => {
  const { error } = await callEdgeFunction(
    supabaseClient,
    "api/profile/public",
    {
      method: "PATCH",
      body: { username },
    }
  );

  if (error) {
    Logger.error(error.message);
    throw error;
  }
};
