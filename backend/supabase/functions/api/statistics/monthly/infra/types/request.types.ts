import { z } from "@zod";

export const requestSchema = z.object({
  min_date: z.string(),
  max_date: z.string(),
});
