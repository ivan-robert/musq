import { DisplayableTimeSeriesPoint } from "#modules/Statistics/ByExercise/utils/displayablePoints.types";

export const getBarPositions = (
  timeSerie: DisplayableTimeSeriesPoint[],
  width: number
): number[] => {
  if (timeSerie.length === 0) {
    return [];
  }
  const xOffset = width / timeSerie.length / 2;
  return timeSerie.map((point, index) => {
    const x = (index / timeSerie.length) * width;
    return x + xOffset;
  });
};
