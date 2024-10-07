import { SessionsStats } from "#modules/Statistics/SessionsStats/domain/sessionStats.types";
import { SessionsStatsDTO } from "#modules/Statistics/SessionsStats/infra/globalStats.dto";
import { adaptSessionsStats } from "#modules/Statistics/SessionsStats/infra/sessionsStats.adapter";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { dateToTimestampz } from "#shared/utils/dateConverter";
import { SupabaseClient } from "@supabase/supabase-js";

export const sessionsStatsConnector = async (
  client: SupabaseClient,
  user_id: string,
  min_date: Date,
  max_date: Date
): Promise<SessionsStats> => {
  const min_dateISOString = dateToTimestampz(min_date);
  const max_dateISOString = dateToTimestampz(max_date);
  const { data, error } = await callEdgeFunction<SessionsStatsDTO>(
    client,
    "/api/statistics/monthly",
    {
      body: {
        min_date: min_dateISOString,
        max_date: max_dateISOString,
      },
    }
  );
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("No data returned by fetchSessionsStatsAPI");
  }

  const rawData = data;
  return adaptSessionsStats(rawData);
};
