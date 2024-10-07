import { z } from "@zod";
import { exoSchema } from "#shared/infra/types/exercise.dto.ts";

const BaseSerie = z.object({
  id: z.string(),
  repos: z.number(),
  perfId: z.string(),
});

const PoidsSerie = BaseSerie.extend({
  type: z.literal("POIDS"),
  poids: z.number(),
  reps: z.number(),
  echec: z.boolean(),
  isWarmup: z.boolean(),
});

const dropset = BaseSerie.omit({ id: true }).extend({
  type: z.literal("DROPSET"),
  sets: z.array(
    z.object({
      poids: z.number(),
      reps: z.number(),
    })
  ),
});

const TempsSerie = BaseSerie.extend({
  type: z.literal("TEMPS"),
  temps: z.number(),
});

const RepsSerie = BaseSerie.extend({
  type: z.literal("REPS"),
  reps: z.number(),
  echec: z.boolean(),
});

export const serieSchema = z.discriminatedUnion("type", [
  PoidsSerie,
  TempsSerie,
  RepsSerie,
  dropset,
]);

export const circuitSetSchema = z.object({
  exercise: exoSchema,
  set: serieSchema,
});

const preparedPoidsSetSchema = z.object({
  type: z.literal("POIDS"),
  reps: z.number(),
  echec: z.boolean(),
  isWarmup: z.boolean(),
});

const preparedRepSetSchema = z.object({
  type: z.literal("REPS"),
  reps: z.number(),
  echec: z.boolean(),
});

const preparedTimeSetSchema = z.object({
  type: z.literal("TEMPS"),
  time: z.number(),
});

const preparedDropsetSchema = z.object({
  type: z.literal("DROPSET"),
  sets: z.array(
    z.object({
      reps: z.number(),
      echec: z.boolean(),
    })
  ),
});

export const preparedSetSchema = z.discriminatedUnion("type", [
  preparedPoidsSetSchema,
  preparedRepSetSchema,
  preparedTimeSetSchema,
  preparedDropsetSchema,
]);

export const preparedCircuitSetSchema = z.object({
  exercise: exoSchema,
  set: preparedSetSchema,
});

export type Serie = z.infer<typeof serieSchema>;

export type WeightSet = z.infer<typeof PoidsSerie>;

export type RepSet = z.infer<typeof RepsSerie>;

export type TimeSet = z.infer<typeof TempsSerie>;

export type Dropset = z.infer<typeof dropset>;

export type CircuitSet = z.infer<typeof circuitSetSchema>;

export type PreparedCircuitSet = z.infer<typeof preparedCircuitSetSchema>;

export type PreparedClassicSet = z.infer<typeof preparedSetSchema>;
