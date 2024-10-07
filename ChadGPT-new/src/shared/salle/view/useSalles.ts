import { useSuspenseQuery } from "@tanstack/react-query";
import { sallesConnector } from "../infra/salles.connector";

import { useSupabaseClient } from "#app/supabaseClient";

export const useSalles = () => {
  const supabaseClient = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: ["salles"],
    queryFn: async () => await sallesConnector(supabaseClient),
  });
};
