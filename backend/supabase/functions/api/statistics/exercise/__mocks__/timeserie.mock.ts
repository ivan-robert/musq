import { TimeseriePoint } from "../infra/timeserie.types.ts";

const sampleTimeSeriePoint = {
  date: new Date("2022-01-03").toISOString(),
  reps: 10,
  set_id: "1",
  intensity: 100,
  rest_in_seconds: 1,
  perf_id: "perf_id_1",
  is_pr: false,
  failure: false,
  time_in_seconds: null,
  weight: null,
};

export const threePointsRepsTimeSerie: TimeseriePoint[] = [
  {
    ...sampleTimeSeriePoint,
    date: new Date("2022-01-03").toISOString(),
    reps: 10,
    intensity: 100,
    set_id: "1",
  },
  {
    ...sampleTimeSeriePoint,
    date: new Date("2022-01-04").toISOString(),
    reps: 12,
    intensity: 120,
    set_id: "2",
  },
  {
    ...sampleTimeSeriePoint,
    date: new Date("2022-01-05").toISOString(),
    reps: 6,
    intensity: 50,
    set_id: "3",
  },
];

export const threePointsRepsTimeSerieInput = threePointsRepsTimeSerie.map(
  (point) => ({
    ...point,
    intensity: undefined,
  })
);
