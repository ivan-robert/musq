import { equipmentSchema } from "#shared/exo/infra/equipment.dto";
import { bodyPartSchema } from "#shared/exo/infra/muscles.dto";
import { z } from "zod";

export const exoTypesConst = ["reps", "temps", "poids"] as const;

export const exoTypeEnum = z.enum(exoTypesConst);

export const exoTypes = exoTypeEnum.Values;

export type ExoType = z.infer<typeof exoTypeEnum>;

export const exoSchema = z.object({
  addedBy: z.string().optional(),
  exoId: z.string(),
  exoName: z.string(),
  exoType: exoTypeEnum,
  imageURL: z.string().optional(),
  muscles: z.record(z.number()),
  equipment: equipmentSchema.optional(),
  instructions: z.array(z.string()).optional(),
  bodyPart: bodyPartSchema,
});

export type Exo = z.infer<typeof exoSchema>;
