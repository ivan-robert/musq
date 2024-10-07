import { computeTotalTrainingTimeInSeconds } from "./utils/compute_total_training_time.ts";
import { computeMuscleRepartition } from "./utils/compute_muscle_repartition.ts";
import { ResponseBody } from "./infra/types/response.types.ts";
import { get_exercise_map } from "#functions/api/exercises/fetch-exos/fetchExercises.ts";
import { User } from "@supabase/supabase-js";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { get_workouts } from "#functions/api/workouts/fetch-workouts/infra/api/fetch-workouts.ts";

export const computeMonthlyStatistics = async (req: Request, user: User) => {
  const { min_date, max_date } = await req.json();
  const exercises_map = await get_exercise_map(user);

  const { data: rawWorkouts } = await supabase_client
    .from("seances")
    .select("*")
    .eq("user_clerk_id", user.id)
    .gte("start_date", min_date)
    .lte("end_date", max_date)
    .throwOnError();

  const workout_ids = rawWorkouts
    ? rawWorkouts.map((workout) => workout.seance_id)
    : [];

  const workouts = await get_workouts(workout_ids);

  const numberOfSeances = workouts.length;

  const totalDuration = computeTotalTrainingTimeInSeconds(workouts);

  const averageDuration = totalDuration / Math.max(numberOfSeances, 1);

  const muscleRepartition = computeMuscleRepartition(workouts, exercises_map);

  const response_body: ResponseBody = {
    number_of_sessions: numberOfSeances,
    total_training_time: totalDuration,
    average_training_time: averageDuration,
    muscle_repartion: muscleRepartition,
  };

  return new Response(JSON.stringify(response_body), {
    headers: { "Content-Type": "application/json" },
  });
};
