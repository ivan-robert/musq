import { DisplayableTimeSeriesPoint } from "#modules/Statistics/ByExercise/utils/displayablePoints.types";
import { getBarPositions } from "#modules/Statistics/ByExercise/utils/getBarPositions";
import { getMainKey } from "#modules/Statistics/ByExercise/utils/getChartKeys";
import { Exo } from "#shared/exo/domain/exo.types";

const BAR_PADDING = 0.2;
const BAR_MAX_WIDTH = 60;
const X_LEGEND_SIZE = 30;
const Y_LEGEND_SIZE = 20;
const NUMBER_OF_STEPS = 5;
const Y_LEGEND_TEXT_SIZE = 12;
const Y_TICK_THRESHOLD = 5;

type Args = {
  timeserie: DisplayableTimeSeriesPoint[];
  width: number;
  height: number;
  exo: Exo;
  showIntensity: boolean;
};

export const useChartTools = ({ exo, height, timeserie, width }: Args) => {
  const chartHeight = height - X_LEGEND_SIZE;
  const chartWidth = width - Y_LEGEND_SIZE;
  const valueKey: "reps" | "weight" | "time_in_seconds" = getMainKey(
    exo.exoType
  );
  const barPositions = getBarPositions(timeserie, width);
  const maxValue = timeserie.reduce((acc, point) => {
    const dangerouslyCastedValue = point[valueKey] as number;
    return (
      Math.round(Math.max(dangerouslyCastedValue, acc) / Y_TICK_THRESHOLD + 1) *
      Y_TICK_THRESHOLD
    );
  }, 0);

  const maxIntensity = timeserie.reduce((acc, point) => {
    return (
      Math.round(Math.max(point.intensity ?? 0, acc) / Y_TICK_THRESHOLD + 1) *
      Y_TICK_THRESHOLD
    );
  }, 0);

  const computedBarWidth = (width / (timeserie.length + 1)) * (1 - BAR_PADDING);

  const barHeights = timeserie.map(
    (point) => (chartHeight * (point[valueKey] ?? 0)) / maxValue
  );

  const intensityBarHeights = timeserie.map(
    (point) => (chartHeight * (point.intensity ?? 0)) / maxValue
  );

  const xLegend = timeserie.map((point) => {
    return new Date(point.date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
    });
  });

  const yLegend = Array.from({ length: NUMBER_OF_STEPS + 1 }, (_, i) => i)
    .map((index) => ({
      label: Math.round((index / NUMBER_OF_STEPS) * maxValue * 10) / 10,
      height: (index * chartHeight) / NUMBER_OF_STEPS,
      size: Y_LEGEND_TEXT_SIZE,
    }))
    .slice(0, -1);

  const intensityLegend = Array.from(
    { length: NUMBER_OF_STEPS + 1 },
    (_, i) => i
  )
    .map((index) => ({
      label: Math.round((index / NUMBER_OF_STEPS) * maxIntensity * 10) / 10,
      height: (index * chartHeight) / NUMBER_OF_STEPS,
      size: Y_LEGEND_TEXT_SIZE,
    }))
    .slice(0, -1);

  return {
    barPositions,
    maxValue: { main: maxValue, intensity: maxIntensity },
    valueKey,
    barWidth: Math.min(BAR_MAX_WIDTH, computedBarWidth),
    barHeights,
    chartHeight,
    chartWidth,
    legend: { x: xLegend, y: yLegend, intensity: intensityLegend },
    intensityBarHeights,
  };
};
