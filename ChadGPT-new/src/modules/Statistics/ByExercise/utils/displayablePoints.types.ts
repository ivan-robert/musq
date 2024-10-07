import { z } from "zod";

export const displayableTimeSeriePointSchema = z.object({
  perf_id: z.string(),
  date: z.string(),

  reps: z.number().nullable(),
  weight: z.number().nullable(),
  time_in_seconds: z.number().nullable(),
  rest_in_seconds: z.number(),
  failure: z.boolean().nullable(),
  intensity: z.number(),
  is_pr: z.boolean().nullable(),
});

export type DisplayableTimeSeriesPoint = z.infer<
  typeof displayableTimeSeriePointSchema
>;
