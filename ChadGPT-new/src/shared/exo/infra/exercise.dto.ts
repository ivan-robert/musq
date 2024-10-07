import { bodyPartSchema, muscleSchema } from "./muscles.dto";
import { equipmentSchema } from "./equipment.dto";
import { z } from "zod";

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
