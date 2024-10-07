import { useSupabaseClient } from "#app/supabaseClient";
import { fetchExerciseMap } from "#shared/exo/infra/exos.connector";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useOfficialExosContext = () => {
  const supabaseClient = useSupabaseClient();
  const { data } = useSuspenseQuery({
    staleTime: Infinity,
    queryKey: ["exos"],
    queryFn: async () => await fetchExerciseMap(supabaseClient),
  });
  return data;
};
