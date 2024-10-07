import { z } from "zod";
import { exoSchema } from "#shared/exo/domain/exo.types";
import {
  circuitSetSchema,
  preparedCircuitSetSchema,
  preparedSetSchema,
  serieSchema,
} from "./serie.types";

const classicPerfSchema = z.object({
  perfId: z.string(),
  exo: exoSchema,
  series: z.array(serieSchema),
  perfType: z.literal("CLASSIC"),
  rest: z.number(),
});

export const circuitSchema = z.object({
  perfId: z.string(),
  exos: z.array(exoSchema),
  series: z.array(
    z.object({ rest: z.number(), subsets: z.array(circuitSetSchema) })
  ),
  restTime: z.number(),
  perfType: z.literal("CIRCUIT"),
});

export const perfSchema = z.discriminatedUnion("perfType", [
  classicPerfSchema,
  circuitSchema,
]);

export type Circuit = z.infer<typeof circuitSchema>;

export type GenericPerf = z.infer<typeof perfSchema>;

export type ClassicPerf = z.infer<typeof classicPerfSchema>;

const preparedClassicPerfSchema = z.object({
  perfType: z.literal("CLASSIC"),
  exo: exoSchema,
  series: z.array(preparedSetSchema),
  rest: z.number(),
  description: z.string().optional(),
});

const preparedCircuitSchema = z.object({
  perfType: z.literal("CIRCUIT"),
  exos: z.array(exoSchema),
  series: z.array(
    z.object({ rest: z.number(), subsets: z.array(preparedCircuitSetSchema) })
  ),
  rest: z.number(),
  description: z.string().optional(),
});

export const preparedPerfSchema = z.discriminatedUnion("perfType", [
  preparedClassicPerfSchema,
  preparedCircuitSchema,
]);

export type ClassicPerfTemplate = z.infer<typeof preparedClassicPerfSchema>;

export type PreparedPerf = z.infer<typeof preparedPerfSchema>;

export type CircuitTemplate = z.infer<typeof preparedCircuitSchema>;
