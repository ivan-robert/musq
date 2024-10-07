import { ParamsDTO } from "./infra/params.dto.ts";
import { computeStatistics } from "./compute_statistics.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { get_exercise_map } from "#functions/api/exercises/fetch-exos/fetchExercises.ts";
import { User } from "@supabase/supabase-js";
import { TimeseriePointWithoutIntensity } from "#functions/api/statistics/exercise/infra/timeserie.types.ts";

/**
 *
 * Computes the statistics for a given exercise in a given time range.
 * Currently does not support circuits
 */
export const computeExerciseStatistics = async (req: Request, user: User) => {
  const input: ParamsDTO = await req.json();

  const { data: ids } = await supabase_client
    .from("seances")
    .select("seance_id, start_date")
    .eq("user_clerk_id", user.id)
    .gte("start_date", input.min_date)
    .lte("end_date", input.max_date)
    .throwOnError();

  const ids_to_search = (ids ?? []).map((id) => id.seance_id).filter(Boolean);

  const dates_map = (ids ?? []).reduce<Record<string, string>>((acc, id) => {
    acc[id.seance_id] = id.start_date!;
    return acc;
  }, {});

  const { data: perfs } = await supabase_client
    .from("perfs")
    .select(`*, sets!inner(*)`)
    .eq("exo_id", input.exo_id)
    .in("seance_id", ids_to_search)
    .throwOnError();

  const exercise_map = await get_exercise_map(user);
  const perfWithDates = (perfs ?? []).map((perf) => {
    return {
      ...perf,
      date: dates_map[perf.seance_id],
    };
  });

  const exo = exercise_map[input.exo_id];

  const sets = perfWithDates.flatMap((perf) =>
    perf.sets.map((set) => ({ ...set, date: perf.date }))
  );

  const pointsForComputing: TimeseriePointWithoutIntensity[] = sets.map(
    (set) => {
      return {
        date: set.date,
        failure: set.failure,
        perf_id: set.perf_id!,
        reps: set.reps,
        rest_in_seconds: Math.max(set.rest_in_seconds, 0),
        set_id: set.set_id,
        time_in_seconds: set.time_in_seconds,
        weight: set.weight,
        intensity: set.is_dropset ? 100 : undefined,
      };
    }
  );

  const response = await computeStatistics(
    pointsForComputing,
    input.min_date,
    input.max_date,
    exo.exoType === "poids"
      ? "weight"
      : exo.exoType === "temps"
      ? "time_in_seconds"
      : "reps"
  );

  return response;
};
