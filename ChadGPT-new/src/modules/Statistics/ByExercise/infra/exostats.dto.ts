import { z } from "zod";

const statisticsDtoSchema = z.object({
  number_of_new_pr: z.number(),
  total_volume: z.object({
    value: z.number(),
    unit: z.enum(["kg", "reps", "seconds"]),
  }),
  average_intensity: z.number(),
  average_rest_time: z.number(),
  number_of_failures: z.number(),
  pr: z.object({ value: z.number(), unit: z.enum(["kg", "reps", "seconds"]) }),
});

const timeseriePointSchema = z.object({
  set_id: z.string(),
  perf_id: z.string(),
  reps: z.number().nullable(),
  weight: z.number().nullable(),
  time_in_seconds: z.number().nullable(),
  rest_in_seconds: z.number(),
  failure: z.boolean().nullable(),
  intensity: z.number(),
  date: z.string(),
  is_pr: z.boolean(),
});

const dataOutSchema = z.object({
  stats: statisticsDtoSchema,
  timeserie: z.array(timeseriePointSchema),
});

export type DataOut = z.infer<typeof dataOutSchema>;

export type TimeSeriePointDTO = z.infer<typeof timeseriePointSchema>;
