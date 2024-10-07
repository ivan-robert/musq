import { z } from "zod";

import { salleSchema } from "#shared/salle/domain/salle.types";
import {
  perfSchema,
  preparedPerfSchema,
} from "#modules/Seance/domain/perf.types";
import { bodyPartSchema } from "#shared/exo/infra/muscles.dto";
import { publicUserSchema } from "#modules/social/domain/publicUser.types";

export const workoutSchema = z.object({
  id: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  types: z.array(bodyPartSchema),
  perfs: z.array(perfSchema),
  salle: salleSchema,
  userId: z.string(),
  template_id: z.number().optional(),
});

export const preparedWorkoutSchema = z.object({
  id: z.number().nullable(),
  title: z.string(),
  description: z.string().optional(),
  content: z.array(preparedPerfSchema),
  creator: publicUserSchema,
  created_at: z.string(),
});

export type PreparedWorkout = z.infer<typeof preparedWorkoutSchema>;

export type Workout = z.infer<typeof workoutSchema>;
