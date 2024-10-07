import { z } from "@zod";
import { perfSchema, preparedPerfSchema } from "./perf.dto.ts";
import { bodyPartSchema } from "../../../api/exercises/fetch-exos/infra/types/muscles.dto.ts";
import { salleSchema } from "#shared/infra/types/salle.dto.ts";
import { publicUserSchema } from "#shared/infra/types/publicUser.dto.ts";

export const workoutDTOSchema = z.object({
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

export type SeanceType = z.infer<typeof bodyPartSchema>;
export type WorkoutDTO = z.infer<typeof workoutDTOSchema>;
export type PreparedWorkout = z.infer<typeof preparedWorkoutSchema>;
