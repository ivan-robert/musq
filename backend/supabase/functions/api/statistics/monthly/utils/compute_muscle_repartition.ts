import {
  MuscleDTO,
  muscleSchema,
} from "../../../exercises/fetch-exos/infra/types/muscles.dto.ts";
import { WorkoutDTO } from "#shared/infra/types/seance.dto.ts";
import { Exercise } from "#shared/infra/types/exercise.dto.ts";

export const computeMuscleRepartition = (
  seances: WorkoutDTO[],
  exercises_map: Record<string, Exercise>
) => {
  let finalRepartition: Record<string, number> = muscleSchema.options.reduce(
    (acc: Record<string, number>, muscle: MuscleDTO) => {
      acc[muscle] = 0;
      return acc;
    },
    {}
  );

  for (const seance of seances) {
    for (const perf of seance.perfs) {
      if (perf.perfType === "CLASSIC") {
        const exo = exercises_map[perf.exo.exoId];
        for (const muscle in exo.muscles) {
          if (!finalRepartition[muscle]) {
            finalRepartition[muscle] = perf.series.length * exo.muscles[muscle];
            continue;
          }
          finalRepartition[muscle] += perf.series.length * exo.muscles[muscle];
        }
      }
    }
  }
  return finalRepartition;
};
