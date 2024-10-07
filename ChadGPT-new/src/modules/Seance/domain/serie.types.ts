import { exoSchema } from "#shared/exo/domain/exo.types";
import { z } from "zod";

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

export const dropset = BaseSerie.extend({
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

export type Serie = z.infer<typeof serieSchema>;

export type WeightSet = z.infer<typeof PoidsSerie>;

export type RepSet = z.infer<typeof RepsSerie>;

export type TimeSet = z.infer<typeof TempsSerie>;

export type Dropset = z.infer<typeof dropset>;

export type CircuitSet = z.infer<typeof circuitSetSchema>;

export const preparedPoidsSetSchema = z.object({
  type: z.literal("POIDS"),
  reps: z.number(),
  echec: z.boolean(),
  isWarmup: z.boolean(),
});

export const preparedRepSetSchema = z.object({
  type: z.literal("REPS"),
  reps: z.number(),
  echec: z.boolean(),
});

export const preparedTimeSetSchema = z.object({
  type: z.literal("TEMPS"),
  time: z.number(),
});

export const preparedDropsetSchema = z.object({
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

export type PreparedSet = z.infer<typeof preparedSetSchema>;

export type PreparedDropset = z.infer<typeof preparedDropsetSchema>;
