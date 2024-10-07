import {
  ExoStats,
  TimeSeriePoint,
  Unit,
} from "#modules/Statistics/ByExercise/domain/exostats.types";
import {
  DataOut,
  TimeSeriePointDTO,
} from "#modules/Statistics/ByExercise/infra/exostats.dto";
import { DateTime } from "luxon";

const getDomainUnit = (unit: "seconds" | "reps" | "kg"): Unit => {
  if (unit === "seconds") {
    return "s";
  }
  return unit;
};

export const adaptExoStats = (
  data: DataOut | "NO_DATA"
): ExoStats | "NO_DATA" => {
  if (data === "NO_DATA" || data.timeserie.length === 0) {
    return "NO_DATA";
  }
  return {
    stats: {
      ...data.stats,
      average_intensity: +data.stats.average_intensity.toFixed(2),
      average_rest_time: +data.stats.average_rest_time.toFixed(2),
      pr: {
        value: +data.stats.pr.value.toFixed(2),
        unit: getDomainUnit(data.stats.pr.unit),
      },
      total_volume: {
        value: +data.stats.total_volume.value.toFixed(2),
        unit: getDomainUnit(data.stats.total_volume.unit),
      },
    },
    timeserie: aggregateTimeSerie(data.timeserie),
  };
};

/**
 * Aggregates the array, grouping the sets by day
 */

const aggregateTimeSerie = (
  timeserie: TimeSeriePointDTO[]
): TimeSeriePoint[] => {
  if (timeserie.length === 0) {
    return [];
  }

  //get all the days in the timeserie
  const aggregatedPoints: Record<string, TimeSeriePoint> = {};

  timeserie.forEach((point) => {
    const neutralDate = DateTime.fromISO(point.date)
      .startOf("day")
      .toFormat("yyyy-MM-dd");
    if (!aggregatedPoints[neutralDate]) {
      aggregatedPoints[neutralDate] = {
        date: neutralDate,
        perf_id: point.perf_id,
        sets: [
          {
            failure: point.failure,
            intensity: point.intensity,
            is_pr: point.is_pr,
            reps: point.reps,
            rest_in_seconds: point.rest_in_seconds,
            time_in_seconds: point.time_in_seconds,
            weight: point.weight,
          },
        ],
      };
    } else {
      aggregatedPoints[neutralDate].sets.push({
        failure: point.failure,
        intensity: point.intensity,
        is_pr: point.is_pr,
        reps: point.reps,
        rest_in_seconds: point.rest_in_seconds,
        time_in_seconds: point.time_in_seconds,
        weight: point.weight,
      });
    }
  });

  return Object.values(aggregatedPoints).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
};
