import { useSupabaseClient } from "#app/supabaseClient";
import { exoStatsConnector } from "#modules/Statistics/ByExercise/infra/exostats.connector";
import { useUserContext } from "#modules/auth/context/User.context";
import { useSuspenseQuery } from "@tanstack/react-query";

export const getExoStatsQueryKey = (exoId: string) => ["exoStats", exoId];

export const useExoStats = (exoId: string, minDate: Date, maxDate: Date) => {
  const client = useSupabaseClient();
  const { user } = useUserContext();
  return useSuspenseQuery({
    queryKey: getExoStatsQueryKey(exoId),
    queryFn: () => {
      return exoStatsConnector(client, exoId, user.id, minDate, maxDate);
    },
  });
};
