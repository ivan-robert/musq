import { z } from "@zod";
import { bodyPartSchema, muscleSchema } from "./muscles.dto.ts";
import { equipmentSchema } from "./equipment.dto.ts";

export const exerciseDTOSchema = z.object({
  bodyPart: bodyPartSchema,
  equipment: equipmentSchema,
  gifUrl: z.string(),
  id: z.string(),
  name: z.string(),
  target: muscleSchema,
  secondaryMuscles: z.array(muscleSchema),
  instructions: z.array(z.string()),
});

export type ExerciseDTO = z.infer<typeof exerciseDTOSchema>;
