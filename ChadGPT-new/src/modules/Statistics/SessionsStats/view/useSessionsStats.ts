import { useSupabaseClient } from "#app/supabaseClient";
import { sessionsStatsConnector } from "#modules/Statistics/SessionsStats/infra/sessionsStats.connector";
import { useUserContext } from "#modules/auth/context/User.context";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSessionsStats = (min_date: Date, max_date: Date) => {
  const client = useSupabaseClient();
  const { user } = useUserContext();

  return useSuspenseQuery({
    queryFn: async () => {
      return sessionsStatsConnector(client, user.id, min_date, max_date);
    },
    queryKey: ["sessionsStats", user.id, min_date, max_date],
    staleTime: 0,
  });
};
