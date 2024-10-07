import { workoutSchema } from "#modules/Seance/domain/seance.types";
import { imagePickerAssetSchema } from "#shared/service/storage/ImagePicker.service";
import { z } from "zod";

export const workoutWithMetaFormSchema = z.object({
  images: z.array(imagePickerAssetSchema),
  title: z.string(),
  description: z.string(),
  workout: workoutSchema,
});

export type WorkoutFullForm = z.infer<typeof workoutWithMetaFormSchema>;
