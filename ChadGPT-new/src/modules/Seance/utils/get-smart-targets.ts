import { Workout } from "#modules/Seance/domain/seance.types";
import { Exo } from "#shared/exo/domain/exo.types";
import { BodyPartDTO } from "#shared/exo/infra/muscles.dto";

export const getSmartTargets = (workout: Workout): BodyPartDTO[] => {
  const workoutExercises = getExercises(workout);

  const acc: Partial<Record<BodyPartDTO, number>> = {};
  workoutExercises.forEach((exo) => {
    if (exo.bodyPart in acc) {
      acc[exo.bodyPart]! += 1;
    } else {
      acc[exo.bodyPart] = 1;
    }
  });

  return Object.entries(acc)
    .map(([bodyPart, count]) => ({
      bodyPart: bodyPart as BodyPartDTO,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 2)
    .map((item) => item.bodyPart);
};

const getExercises = (workout: Workout): Exo[] => {
  const out: Exo[] = [];
  workout.perfs.forEach((perf) => {
    if (perf.perfType === "CLASSIC") {
      out.push(perf.exo);
    }
    if (perf.perfType === "CIRCUIT") {
      perf.exos.forEach((exo) => {
        out.push(exo);
      });
    }
  });
  return out;
};
