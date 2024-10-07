import { z } from "zod";

export type Salle = {
  id: string;
  nom: string;
};

export const salleSchema = z.object({
  id: z.string(),
  nom: z.string(),
});
