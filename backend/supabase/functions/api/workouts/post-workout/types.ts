import { z } from "@zod";
import { workoutDTOSchema } from "#shared/infra/types/seance.dto.ts";

export const imagePickerAssetSchema = z.object({
  uri: z.string(),
  assetId: z.string().nullable().optional(),
  width: z.number(),
  height: z.number(),
  type: z.enum(["image", "video"]).optional(),
  fileName: z.string().nullable().optional(),
  fileSize: z.number().optional(),
  exif: z.record(z.any()).nullable().optional(),
  base64: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
  mimeType: z.string().optional(),
});

export const workoutWithMetaFormSchema = z.object({
  images: z.array(imagePickerAssetSchema),
  title: z.string(),
  description: z.string(),
  workout: workoutDTOSchema,
});

export type WorkoutWithMetaForm = z.infer<typeof workoutWithMetaFormSchema>;
