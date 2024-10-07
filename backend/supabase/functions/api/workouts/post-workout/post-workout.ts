import {
  WorkoutWithMetaForm,
  workoutWithMetaFormSchema,
} from "#functions/api/workouts/post-workout/types.ts";
import { User } from "@supabase/supabase-js";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { postImages } from "#functions/api/workouts/post-workout/post-images.ts";
import {
  insertPerfInCircuit,
  insertPerfInClassic,
} from "#functions/api/workouts/post-workout/perf-action.ts";

export const postWorkout = async (req: Request, user: User) => {
  const workout = (await req.json()) as WorkoutWithMetaForm;

  if (!workoutWithMetaFormSchema.safeParse(workout)) {
    return new Response("Invalid request body", { status: 400 });
  }

  const { data, error } = await supabase_client
    .from("seances")
    .insert({
      end_date: workout.workout.endDate,
      start_date: workout.workout.startDate,
      seance_types: workout.workout.types,
      salle_id: workout.workout.salle.id,
      user_clerk_id: user.id,
      template_id: workout.workout.template_id,
    })
    .select("seance_id");

  if (error) {
    console.error(error);
    throw error;
  }
  if (!data) {
    throw new Error("ERROR NO DATA");
  }
  const workout_id = data[0].seance_id;
  for (const [index, perf] of workout.workout.perfs.entries()) {
    if (perf.perfType === "CLASSIC") {
      const { data, error } = await supabase_client
        .from("perfs")
        .insert({
          exo_id: perf.exo.exoId,
          seance_id: workout_id,
          rest_time: perf.rest,
          index: index,
        })
        .select("perf_id");
      if (error) {
        console.error(error);
        return new Response("error");
      }
      if (!data) {
        return new Response("error");
      }
      const perf_id = data[0].perf_id;
      insertPerfInClassic({ ...perf, perfId: perf_id });
    }
    if (perf.perfType === "CIRCUIT") {
      const { data, error } = await supabase_client
        .from("perfs")
        .insert({
          exo_id: null,
          seance_id: workout_id,
          rest_time: perf.restTime,
          index: index,
        })
        .select("perf_id");
      if (error) {
        console.error(error);
        return new Response("error");
      }
      if (!data) {
        return new Response("error");
      }
      const perf_id = data[0].perf_id;
      insertPerfInCircuit({ ...perf, perfId: perf_id });
    }
  }

  const post_name =
    workout.title.length > 0
      ? workout.title
      : get_default_workout_name(req.headers.get("language"));

  const { data: post_id } = await supabase_client
    .from("posts")
    .insert([
      {
        created_at: new Date().toISOString(),
        description: workout.description,
        title: post_name,
        user_clerk_id: user.id,
        workout_id,
      },
    ])
    .throwOnError()
    .select("post_id")
    .single();

  if (!post_id) {
    throw new Error("ERROR NO POST ID");
  }

  const images = await postImages(
    workout.images,
    post_id.post_id,
    user.id,
    user
  );

  const response = {
    images,
    post_id: post_id.post_id,
    workout_id: data[0].seance_id,
  };

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

const get_default_workout_name = (lang: string | null) => {
  if (lang === "FR" || lang === "fr" || lang === "fr-FR") {
    return `Séance du ${new Date().toLocaleDateString("fr-FR")}`;
  }
  return `Workout of ${new Date().toLocaleDateString("en-US")}`;
};
