import { callEdgeFunction } from "#shared/infra/requestHandler";
import { Logger } from "#shared/service/logger.service";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export const syncProfilesAPI = async (
  supabaseClient: SupabaseClient,
  user_id: string
) => {
  const { error } = await callEdgeFunction(
    supabaseClient,
    axios.getUri({
      url: "/api/profile/synchronize",
      params: { user_id },
    }),
    { method: "POST" }
  );

  if (error) {
    Logger.error(error.message);
    throw error;
  }

  Logger.info(`Profiles synchronized for user: ${user_id}`);
};
