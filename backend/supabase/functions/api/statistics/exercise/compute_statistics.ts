import { TimeseriePointWithoutIntensity } from "./infra/timeserie.types.ts";
import { DataOut, StatisticsDto } from "./infra/response.dto.ts";

type ComputePrPoint = {
  lastPr: TimeseriePointWithoutIntensity;
  perf: TimeseriePointWithoutIntensity;
};

const unitMap = {
  weight: "kg",
  reps: "reps",
  time_in_seconds: "seconds",
} as const;
type ComputationKey = keyof typeof unitMap;

/**
 *
 * @param timeserie
 * @param key
 * @returns a timeserie with the intensity field added
 */

export const annotateTimeSerie = (
  timeserie: TimeseriePointWithoutIntensity[],
  key: ComputationKey
) => {
  const timeSerieWithPr = timeserie.reduce((acc: ComputePrPoint[], item) => {
    if (item[key] === null) {
      throw new Error(
        `Invalid ${key} timeserie point: ` + JSON.stringify(item)
      );
    }

    if (acc.length === 0) {
      return [{ lastPr: item, perf: item }];
    }

    if (acc[acc.length - 1].lastPr[key]! < item[key]!) {
      return [...acc, { lastPr: item, perf: item }];
    }

    return [...acc, { lastPr: acc[acc.length - 1].lastPr, perf: item }];
  }, []);

  return timeSerieWithPr.map((item, index) => {
    if (index === 0) {
      return { ...item.perf, intensity: 100 };
    }
    if (!item.lastPr[key]) {
      return { ...item.perf, intensity: 100 };
    }

    if (item.lastPr.set_id === item.perf.set_id) {
      return {
        ...item.perf,
        intensity:
          timeserie[index - 1].intensity ??
          (item.perf[key]! / timeSerieWithPr[index - 1].lastPr[key]!) * 100,
      };
    }
    return {
      ...item.perf,
      intensity:
        timeserie[index - 1].intensity ??
        (item.perf[key]! / item.lastPr[key]!) * 100,
    };
  });
};
export const computeStatistics = async (
  rawTimeserie: TimeseriePointWithoutIntensity[],
  minDate: string,
  maxDate: string,
  key: ComputationKey
) => {
  const sortedRawTimeserie = annotateTimeSerie(
    rawTimeserie.sort((a, b) => a.date.localeCompare(b.date)),
    key
  );

  const full_timeserie_without_pr = sortedRawTimeserie.filter(
    (item) => item.date <= maxDate && item.date >= minDate
  );

  const full_timeserie = full_timeserie_without_pr.map((item, index) => {
    return { ...item, is_pr: item.intensity > 100 };
  });

  const total_volume =
    key === "weight"
      ? full_timeserie.reduce((acc, item) => acc + item.weight! * item.reps!, 0)
      : key === "reps"
      ? full_timeserie.reduce((acc, item) => acc + item.reps!, 0)
      : full_timeserie.reduce((acc, item) => acc + item.time_in_seconds!, 0);

  const average_intensity =
    full_timeserie.reduce((acc, item) => acc + item.intensity, 0) /
    Math.max(full_timeserie.length, 1);

  const average_rest_time =
    full_timeserie.reduce((acc, item) => acc + item.rest_in_seconds, 0) /
    Math.max(full_timeserie.length, 1);

  const number_of_failures =
    key !== "time_in_seconds"
      ? full_timeserie.filter((item) => item.failure).length
      : 0;

  const pr = full_timeserie
    .map((item) => item[key])
    .reduce((a, b) => Math.max(a!, b!), 0)!;

  const number_of_new_pr = full_timeserie.filter(
    (item) => item.intensity > 100
  ).length;

  const stats: StatisticsDto = {
    number_of_new_pr,
    total_volume: { value: total_volume, unit: unitMap[key] },
    average_intensity,
    average_rest_time,
    number_of_failures,
    pr: { value: pr, unit: unitMap[key] },
  };

  const output: DataOut = {
    stats,
    timeserie: full_timeserie,
  };

  return new Response(JSON.stringify(output), {
    headers: { "Content-Type": "application/json" },
  });
};
