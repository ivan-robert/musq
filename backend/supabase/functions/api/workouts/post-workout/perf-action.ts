import { GenericPerf } from "#shared/infra/types/perf.dto.ts";
import { Serie } from "#shared/infra/types/set.dto.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

const performSetActionHOF = async (
  serie: Serie,
  index: number,
  action: (set: Omit<Tables<"sets">, "set_id">) => void,
  perfId: string,
  exerciseId: string | null
) => {
  switch (serie.type) {
    case "POIDS":
      action({
        reps: serie.reps,
        rest_in_seconds: serie.repos,
        time_in_seconds: null,
        weight: serie.poids,
        failure: serie.echec,
        index: index,
        perf_id: perfId,
        exercise_id: exerciseId,
        is_warmup: serie.isWarmup,
        is_dropset: false,
      });
      break;
    case "TEMPS":
      action({
        reps: null,
        rest_in_seconds: serie.repos,
        time_in_seconds: serie.temps,
        weight: null,
        failure: false,
        index: index,
        perf_id: perfId,
        exercise_id: exerciseId,
        is_warmup: false,
        is_dropset: false,
      });
      break;
    case "REPS":
      action({
        reps: serie.reps,
        rest_in_seconds: serie.repos,
        time_in_seconds: null,
        weight: null,
        failure: serie.echec,
        index: index,
        perf_id: perfId,
        exercise_id: exerciseId,
        is_warmup: false,
        is_dropset: false,
      });
      break;
    case "DROPSET":
      for (const miniset of serie.sets) {
        action({
          reps: miniset.reps,
          rest_in_seconds: serie.repos,
          time_in_seconds: null,
          weight: miniset.poids,
          failure: true,
          index: index,
          perf_id: perfId,
          exercise_id: exerciseId,
          is_warmup: false,
          is_dropset: true,
        });
      }
      break;
  }
};

export const insertPerfInClassic = async (perf: GenericPerf) => {
  if (perf.perfType !== "CLASSIC") return;

  const builtSets: Omit<Tables<"sets">, "set_id">[] = [];
  let builtIndex = 0;
  perf.series.forEach((serie, i) => {
    performSetActionHOF(
      serie,
      builtIndex,
      (set) => builtSets.push(set),
      perf.perfId,
      perf.exo.exoId
    );

    builtIndex++;
  });

  await supabase_client.from("sets").insert(builtSets);
};

export const insertPerfInCircuit = async (perf: GenericPerf) => {
  if (perf.perfType !== "CIRCUIT") return;

  const builtSets: Omit<Tables<"sets">, "set_id">[] = [];
  let builtIndex = 0;
  perf.series.forEach((serie, i) => {
    serie.subsets.forEach((subset, j) => {
      performSetActionHOF(
        subset.set,
        builtIndex,
        (set) =>
          builtSets.push(
            j === serie.subsets.length - 1
              ? { ...set, rest_in_seconds: serie.rest }
              : set
          ),
        perf.perfId,
        subset.exercise.exoId
      );

      builtIndex++;
    });
  });
  await supabase_client.from("sets").insert(builtSets);
};
