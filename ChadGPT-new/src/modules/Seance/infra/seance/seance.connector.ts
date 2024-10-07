import { Workout } from "../../domain/seance.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import axios from "axios";
import { SupabaseClient } from "@supabase/supabase-js";

export const seancesConnector = async (
  client: SupabaseClient,
  params: {
    id__in?: string[];
    min_date?: string;
    max_date?: string;
  }
): Promise<Workout[]> => {
  const { data: seances } = await callEdgeFunction<Workout[]>(
    client,
    axios.getUri({
      baseURL: "api/workouts/",
      params: {
        min_date: params.min_date,
        max_date: params.max_date,
        ...(params.id__in ? { id__in: params.id__in.join(",") } : {}),
      },
    }),
    { method: "GET" }
  );

  if (!seances) return [];

  return seances;
};
