import { User } from "@supabase/supabase-js";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { get_exercise_map } from "#functions/api/exercises/fetch-exos/fetchExercises.ts";
import { orderBy } from "@lodash";

export const fetchMostPerformedExercises = async (req: Request, user: User) => {
  const full_url = new URL(req.url);
  const min_date = full_url.searchParams.get("min_date");
  const max_date = full_url.searchParams.get("max_date");
  if (!min_date || !max_date) {
    return new Response("Missing min_date or max_date", { status: 400 });
  }

  const { data: workout_chunks } = await supabase_client
    .from("seances")
    .select(
      `perfs (
        exo_id,
        sets (*)
        )`
    )
    .eq("user_clerk_id", user.id)
    .gte("start_date", min_date)
    .lte("end_date", max_date)
    .throwOnError();

  if (!workout_chunks) {
    return new Response("No workouts found", { status: 404 });
  }

  const exos_occur = workout_chunks.reduce<Record<string, number>>(
    (acc, workout) => {
      const subcount = workout.perfs.reduce<Record<string, number>>(
        (perf_acc, perf) => {
          for (const set of perf.sets) {
            const exo_id = set.exercise_id;
            if (!exo_id) break;
            if (perf_acc[exo_id]) {
              perf_acc[exo_id] += 1;
            } else {
              perf_acc[exo_id] = 1;
            }
          }
          return perf_acc;
        },
        {}
      );
      for (const exo_id in subcount) {
        if (acc[exo_id]) {
          acc[exo_id] += subcount[exo_id];
        } else {
          acc[exo_id] = subcount[exo_id];
        }
      }
      return acc;
    },
    {}
  );

  const sorted_exos = Object.keys(exos_occur).sort(
    (a, b) => exos_occur[b] - exos_occur[a]
  );

  return new Response(JSON.stringify(sorted_exos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
