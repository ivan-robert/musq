import { z } from "zod";

export const sessionsStatsDTOSchema = z.object({
  total_training_time: z.number(),
  average_training_time: z.number(),
  number_of_sessions: z.number(),
  muscle_repartion: z.record(z.number()),
});

export type SessionsStatsDTO = z.infer<typeof sessionsStatsDTOSchema>;
