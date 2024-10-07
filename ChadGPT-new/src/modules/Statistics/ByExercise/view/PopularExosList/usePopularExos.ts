import { useSupabaseClient } from "#app/supabaseClient";
import { popularExosConnector } from "#modules/Statistics/ByExercise/infra/popularExos.connector";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

export const usePopularExos = () => {
  const supabaseClient = useSupabaseClient();
  const endOfMonth = DateTime.now().endOf("month").toISODate();
  const startOfMonth = DateTime.now().startOf("month").toISODate();

  return useSuspenseQuery({
    queryKey: ["popularExos", startOfMonth, endOfMonth],
    queryFn: async () => {
      return await popularExosConnector(
        supabaseClient,
        startOfMonth,
        endOfMonth
      );
    },
  });
};
