import { z } from "@zod";
import { workoutDTOSchema } from "#shared/infra/types/seance.dto.ts";
import { publicUserSchema } from "#shared/infra/types/publicUser.dto.ts";
import { mediaSchema } from "#shared/infra/types/media.dto.ts";

const postDtoSchemaCommon = z.object({
  postId: z.string(),
  createdAt: z.string(),
  media: z.array(mediaSchema),
  title: z.string(),
  description: z.string().optional(),
  likes: z.number(),
  posted_by: publicUserSchema,
  nbComments: z.number(),
  didILike: z.boolean(),
});

const workoutPostSchema = postDtoSchemaCommon.extend({
  workout: workoutDTOSchema,
});

export type Post = z.infer<typeof workoutPostSchema>;
