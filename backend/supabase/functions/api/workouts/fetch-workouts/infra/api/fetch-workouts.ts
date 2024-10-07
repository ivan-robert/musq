import { User } from "@supabase/supabase-js";
import {
  get_exercise_map,
  get_universal_exercise_map,
} from "#functions/api/exercises/fetch-exos/fetchExercises.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { adaptWorkout } from "#functions/api/workouts/fetch-workouts/infra/validators/workout.adapter.ts";

export const get_workouts = async (id__in: string[]) => {
  const { data: rawWorkouts } = await supabase_client
    .from("seances")
    .select(
      `*,
    salles (
      *), 
    perfs (
      *, 
      sets (
      *
      )
    )`
    )
    .in("seance_id", id__in)
    .order("start_date", { ascending: false })
    .throwOnError();

  if (!rawWorkouts) throw new Error("No workouts found");
  const user_ids = rawWorkouts
    .map((workout) => workout.user_clerk_id)
    .filter(Boolean) as string[];
  const exercise_map = await get_universal_exercise_map(user_ids);

  return rawWorkouts.map((workout) => adaptWorkout(workout, exercise_map));
};

export const fetch_workouts = async (
  request: Request,
  user: User
): Promise<Response> => {
  const full_url = new URL(request.url);
  const id__in = full_url.searchParams.get("id__in")?.split(",");
  const min_date = full_url.searchParams.get("min_date");
  const max_date = full_url.searchParams.get("max_date");
  const exercise_map = await get_exercise_map(user);

  if (id__in) {
    const zgeg = await get_workouts(id__in);
    return new Response(JSON.stringify(zgeg), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }

  const baseQuery = supabase_client
    .from("seances")
    .select(
      `*,
    salles (
      *), 
    perfs (
      *, 
      sets (
      *
      )
    )`
    )
    .throwOnError()
    .order("start_date", { ascending: false });
  const final_query =
    min_date && max_date
      ? baseQuery.gte("start_date", min_date).lte("end_date", max_date)
      : baseQuery;

  const { data: rawWorkouts } = await final_query;

  if (!rawWorkouts) throw new Error("No workouts found");

  const adapted_workouts = rawWorkouts.map((workout) =>
    adaptWorkout(workout, exercise_map)
  );
  return new Response(JSON.stringify(adapted_workouts), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};
