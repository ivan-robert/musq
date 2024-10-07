import { adaptExoStats } from "#modules/Statistics/ByExercise/infra/exostats.adapter";
import { dateToTimestampz } from "#shared/utils/dateConverter";
import { DataOut } from "#modules/Statistics/ByExercise/infra/exostats.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

export const exoStatsConnector = async (
  supabaseClient: SupabaseClient,
  exoId: string,
  userId: string,
  minDate: Date,
  maxDate: Date
) => {
  const minDateStr = dateToTimestampz(minDate);
  const maxDateStr = dateToTimestampz(maxDate);
  return fetchExoStatsAPI(
    supabaseClient,
    exoId,
    userId,
    minDateStr,
    maxDateStr
  ).then(adaptExoStats);
};

export const fetchExoStatsAPI = async (
  supabaseClient: SupabaseClient,
  exoId: string,
  userId: string,
  minDate: string,
  maxDate: string
): Promise<DataOut | "NO_DATA"> => {
  const { data, error } = await callEdgeFunction<DataOut | "No data found">(
    supabaseClient,
    "/api/statistics/exercise",
    {
      body: {
        user_id: userId,
        exo_id: exoId,
        min_date: minDate,
        max_date: maxDate,
      },
    }
  );

  if (data === "No data found" || typeof data === "string") {
    return "NO_DATA";
  }
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("No data");
  }
  return data;
};
