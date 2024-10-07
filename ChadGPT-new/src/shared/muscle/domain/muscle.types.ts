import { z } from "zod";

export const muscleSchema = z.object({
  muscle_id: z.string(),
  muscle_name: z.string(),
});

export type Muscle = z.infer<typeof muscleSchema>;
