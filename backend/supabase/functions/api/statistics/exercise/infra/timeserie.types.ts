import { z } from "@zod";

export const timeseriePointSchema = z.object({
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

export type TimeseriePoint = z.infer<typeof timeseriePointSchema>;

export const timeseriePointWithoutIntensitySchema = timeseriePointSchema
  .omit({
    is_pr: true,
  })
  .merge(z.object({ intensity: z.number().optional() }));
export type TimeseriePointWithoutIntensity = z.infer<
  typeof timeseriePointWithoutIntensitySchema
>;
