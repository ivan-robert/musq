import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

export const deleteSeanceAPI = async (
  supabaseClient: SupabaseClient,
  seanceId: string
): Promise<void> => {
  const { error } = await callEdgeFunction(
    supabaseClient,
    `api/workouts/${seanceId}`,
    { method: "DELETE" }
  );

  if (error) {
    throw error;
  }
};
