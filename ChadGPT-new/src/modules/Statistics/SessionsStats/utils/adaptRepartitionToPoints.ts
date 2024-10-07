import { DataPoint } from "#shared/view/components/RadarChart/RadarChart";

export const adaptRepartitionToPoints = (
  repartition: Record<string, number>
): DataPoint[] => {
  const unNormalized = Object.entries(repartition)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .filter(({ value }) => value > 0);

  const maxValue = unNormalized.reduce(
    (acc, val) => Math.max(acc, val.value),
    0
  );

  return unNormalized
    .map(({ label, value }) => ({
      label,
      value: Number(((value / maxValue) * 100).toFixed(2)),
    }))
    .filter(({ value }) => value >= 10); // keep only values >= 10% for legibility
};
