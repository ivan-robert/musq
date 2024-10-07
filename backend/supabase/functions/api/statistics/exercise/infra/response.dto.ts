import { z } from "@zod";
import { timeseriePointSchema } from "./timeserie.types.ts";

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

const dataOutSchema = z.object({
  stats: statisticsDtoSchema,
  timeserie: z.array(timeseriePointSchema),
});

export type DataOut = z.infer<typeof dataOutSchema>;

export type StatisticsDto = z.infer<typeof statisticsDtoSchema>;
