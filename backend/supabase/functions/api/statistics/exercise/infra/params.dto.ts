import { z } from "@zod";

export const paramsDTOSchema = z.object({
  exo_id: z.string(),
  min_date: z.string().datetime(),
  max_date: z.string().datetime(),
});

export type ParamsDTO = z.infer<typeof paramsDTOSchema>;
