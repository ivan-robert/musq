import { WorkoutFullForm } from "#modules/Seance/domain/workoutFullForm.schema";
import { MediaDB } from "#shared/infra/media.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";

export type PostWorkoutResponse = {
  post_id: string;
  workout_id: string;
  images: MediaDB[];
};

export const postWorkoutConnector = async (
  supabaseClient: SupabaseClient,
  workoutData: WorkoutFullForm,
  language: string
) => {
  return callEdgeFunction<PostWorkoutResponse>(supabaseClient, "api/workouts", {
    body: workoutData,
    method: "POST",
    headers: { language },
  });
};
