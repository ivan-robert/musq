import { z } from "@zod";

export const salleSchema = z.object({
  id: z.string().uuid(),
  nom: z.string(),
});
