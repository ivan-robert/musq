import { WorkoutDTO } from "#shared/infra/types/seance.dto.ts";

export const computeTotalTrainingTimeInSeconds = (seances: WorkoutDTO[]) => {
  let totalTime = 0;
  for (const seance of seances) {
    totalTime += Math.max(
      0,
      new Date(seance.endDate).getTime() - new Date(seance.startDate).getTime()
    );
  }
  return Math.max(0, totalTime / 1000);
};
