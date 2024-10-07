import { useSupabaseClient } from "#app/supabaseClient";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useWorkoutPosession = (workoutId: string) => {
  const supabaseClient = useSupabaseClient();
  return useQuery({
    queryKey: ["workout-posession", workoutId],
    queryFn: async () => await fetchWorkoutPosession(supabaseClient, workoutId),
  });
};

const fetchWorkoutPosession = async (
  supabaseClient: SupabaseClient,
  workout_id: string
) => {
  const { data } = await callEdgeFunction<{ is_possessed: boolean }>(
    supabaseClient,
    axios.getUri({
      url: "api/workout-templates/check-possessed",
      params: { workout_id },
    }),
    { method: "GET" }
  );
  return data;
};
