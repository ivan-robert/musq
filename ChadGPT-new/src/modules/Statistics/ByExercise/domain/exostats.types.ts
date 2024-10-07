import { z } from "zod";

const unitSchema = z.enum(["kg", "reps", "s"]);

export type Unit = z.infer<typeof unitSchema>;

const statisticsDtoSchema = z.object({
  number_of_new_pr: z.number(),
  total_volume: z.object({
    value: z.number(),
    unit: unitSchema,
  }),
  average_intensity: z.number(),
  average_rest_time: z.number(),
  number_of_failures: z.number(),
  pr: z.object({ value: z.number(), unit: unitSchema }),
});

const timeseriePointSchema = z.object({
  perf_id: z.string(),
  date: z.string(),

  sets: z.array(
    z.object({
      reps: z.number().nullable(),
      weight: z.number().nullable(),
      time_in_seconds: z.number().nullable(),
      rest_in_seconds: z.number(),
      failure: z.boolean().nullable(),
      intensity: z.number(),
      is_pr: z.boolean().nullable(),
    })
  ),
});

const dataOutSchema = z.object({
  stats: statisticsDtoSchema,
  timeserie: z.array(timeseriePointSchema),
});

export type ExoStats = z.infer<typeof dataOutSchema>;
export type TimeSeriePoint = z.infer<typeof timeseriePointSchema>;
