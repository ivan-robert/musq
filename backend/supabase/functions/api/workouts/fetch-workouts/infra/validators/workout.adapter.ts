import { Circuit, GenericPerf } from "#shared/infra/types/perf.dto.ts";
import { groupBy, uniqBy } from "@lodash";
import { Dropset, Serie } from "#shared/infra/types/set.dto.ts";
import { Exercise } from "#shared/infra/types/exercise.dto.ts";
import { WorkoutDTO } from "#shared/infra/types/seance.dto.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";
import { NestedRawWorkout } from "#shared/infra/types/db/helper.types.ts";

export const adaptWorkout = (
  workout: NestedRawWorkout,
  exercise_map: Record<string, Exercise>
): WorkoutDTO => {
  return {
    endDate: workout.end_date!,
    startDate: workout.start_date!,
    id: workout.seance_id!,
    types: workout.seance_types as any[],
    salle: { id: workout.salles!.salle_id, nom: workout.salles!.salle_nom },
    perfs: workout.perfs.map((perf) => adaptPerf(perf, exercise_map)),
    userId: workout.user_clerk_id!,
  };
};

export const adaptPerf = (
  perf: NestedRawWorkout["perfs"][number],
  exercise_map: Record<string, Exercise>
): GenericPerf => {
  if (!perf.exo_id) {
    const sets_for_perf = perf.sets;
    const exercises = uniqBy(
      sets_for_perf,
      (set: Tables<"sets">) => set.exercise_id
    ).map((set: Tables<"sets">) => exercise_map[set.exercise_id!]);
    const min_index = Math.min(...sets_for_perf.map((set) => set.index!));
    const grouped_sets: Tables<"sets">[][] = Object.values(
      groupBy(sets_for_perf, (set: Tables<"sets">) =>
        Math.trunc((set.index! - min_index) / exercises.length)
      )
    );
    const perf_out: Circuit = {
      perfType: "CIRCUIT",
      exos: exercises,
      perfId: perf.perf_id!,
      restTime: perf.rest_time ?? -1,
      series: grouped_sets.map((sets) => {
        const adaptedSets = adapt_classic_sets(sets);
        return {
          rest: sets[sets.length - 1].rest_in_seconds,
          subsets: adaptedSets.map((set, k) => ({
            exercise: exercises[k % exercises.length],
            set,
          })),
        };
      }),
    };
    return perf_out;
  }

  const perf_out: GenericPerf = {
    perfType: "CLASSIC",
    exo: exercise_map[perf.exo_id],
    perfId: perf.perf_id!,
    rest: perf.rest_time ?? -1,
    series: adapt_classic_sets(perf.sets),
  };
  return perf_out;
};

const adapt_classic_sets = (sets: Tables<"sets">[]): Serie[] => {
  const sets_without_dropsets: { set: Serie; index: number }[] = sets
    .filter((set) => !set.is_dropset)
    .map((set) => {
      if (set.weight && set.reps) {
        const zgeg: Serie = {
          type: "POIDS",
          echec: set.failure!,
          id: set.set_id!,
          perfId: set.perf_id!,
          poids: set.weight!,
          reps: set.reps!,
          isWarmup: false,
          repos: set.rest_in_seconds,
        };
        return { set: zgeg, index: set.index! };
      }
      if (set.time_in_seconds) {
        const zgeg: Serie = {
          type: "TEMPS",
          id: set.set_id!,
          perfId: set.perf_id!,
          repos: set.rest_in_seconds,
          temps: set.time_in_seconds,
        };
        return { set: zgeg, index: set.index! };
      }
      if (set.reps) {
        const zgeg: Serie = {
          type: "REPS",
          id: set.set_id!,
          perfId: set.perf_id!,
          echec: set.failure!,
          reps: set.reps,
          repos: set.rest_in_seconds,
        };
        return { set: zgeg, index: set.index! };
      }
      throw new Error("Invalid set");
    });
  const dropsets: Tables<"sets">[][] = Object.values(
    groupBy(
      sets.filter((set) => set.is_dropset),
      (set: Tables<"sets">) => set.index
    )
  );

  const adapted_dropsets: { set: Dropset; index: number }[] = dropsets.map(
    (dropset) => {
      const set: Dropset = {
        type: "DROPSET",
        perfId: dropset[0].perf_id!,
        repos: dropset[0].rest_in_seconds,
        sets: dropset.map((set) => ({ poids: set.weight!, reps: set.reps! })),
      };
      return { set, index: dropset[0].index! };
    }
  );

  return sets_without_dropsets
    .concat(adapted_dropsets)
    .sort((a, b) => a.index - b.index)
    .map((a) => a.set);
};
