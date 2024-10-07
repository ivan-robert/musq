import { z } from "@zod";

const exoTypesConst = ["reps", "temps", "poids"] as const;

const exoTypeEnum = z.enum(exoTypesConst);

const equipments = [
  "assisted",
  "band",
  "barbell",
  "body weight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "ez barbell",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "skierg machine",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "tire",
  "trap bar",
  "upper body ergometer",
  "weighted",
  "wheel roller",
] as const;

export const equipmentSchema = z.enum(equipments);

const bodyParts = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
  "core",
] as const;

export const bodyPartSchema = z.enum(bodyParts);

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

export type Exercise = z.infer<typeof exoSchema>;
