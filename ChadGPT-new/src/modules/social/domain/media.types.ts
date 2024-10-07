import { z } from "zod";

const mediaCommonSchema = z.object({
  asset_id: z.string(),
  bucket_name: z.string(),
  created_at: z.string(),
  file_name: z.string(),
  file_size: z.number(),
  folder: z.string(),
  height: z.number(),
  id: z.number(),
  mime_type: z.string(),
  uploaded_by: z.string(),
  width: z.number(),
});

const videoSchema = mediaCommonSchema.extend({
  type: z.literal("video"),
  duration: z.number(),
});

const imageSchema = mediaCommonSchema.extend({
  type: z.literal("image"),
});

export const mediaSchema = z.discriminatedUnion("type", [
  videoSchema,
  imageSchema,
]);

export type Media = z.infer<typeof mediaSchema>;
