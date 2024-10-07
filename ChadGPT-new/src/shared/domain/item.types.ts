import { z } from "zod";

export const itemSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type Item = z.infer<typeof itemSchema>;
