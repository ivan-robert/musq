import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export const popularExosConnector = async (
  supabaseClient: SupabaseClient,
  min_date: string,
  max_date: string
): Promise<string[]> => {
  const { data: ids } = await callEdgeFunction<string[]>(
    supabaseClient,
    axios.getUri({
      baseURL: "api/exercises/most-performed",
      params: { min_date, max_date },
    }),
    { method: "GET" }
  );
  if (!ids) return [];

  return ids;
};
