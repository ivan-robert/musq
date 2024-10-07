import { TimeSeriePoint } from "#modules/Statistics/ByExercise/domain/exostats.types";
import { DisplayableTimeSeriesPoint } from "#modules/Statistics/ByExercise/utils/displayablePoints.types";

export const adaptPoint = (
  point: TimeSeriePoint
): DisplayableTimeSeriesPoint => {
  return {
    date: point.date,
    perf_id: point.perf_id,
    failure: point.sets.reduce(
      (acc, set) => acc || (set.failure ?? false),
      false
    ),
    intensity: +Math.max(
      ...point.sets.map((set) => set.intensity ?? 0)
    ).toFixed(2),
    is_pr: point.sets.reduce((acc, set) => acc || (set.is_pr ?? false), false),
    reps: Math.max(...point.sets.map((set) => set.reps ?? 0)),
    rest_in_seconds:
      point.sets.reduce((acc, set) => acc + (set.rest_in_seconds ?? 0), 0) /
      point.sets.length,
    time_in_seconds: Math.max(
      ...point.sets.map((set) => set.time_in_seconds ?? 0)
    ),
    weight: point.sets[0].weight,
  };
};
