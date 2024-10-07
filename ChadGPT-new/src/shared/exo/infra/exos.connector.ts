import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { Exo } from "../domain/exo.types";

export const fetchExerciseMap = async (
  supabaseClient: SupabaseClient
): Promise<Record<string, Exo>> => {
  const { data: map, error } = await callEdgeFunction(
    supabaseClient,
    "api/exercises/",
    {
      method: "GET",
    }
  );
  if (error || !map) {
    throw error;
  }

  return map as Record<string, Exo>;
};
