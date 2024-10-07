import { workoutSchema } from "#modules/Seance/domain/seance.types";
import { mediaSchema } from "#modules/social/domain/media.types";
import { publicUserSchema } from "#modules/social/domain/publicUser.types";
import { z } from "zod";

const postSchemaCommon = z.object({
  postId: z.string(),
  createdAt: z.string(),
  title: z.string(),
  description: z.string().optional(),
  likes: z.number(),
  posted_by: publicUserSchema,
  nbComments: z.number(),
  didILike: z.boolean(),
  media: z.array(mediaSchema),
});

const workoutPostSchema = postSchemaCommon.extend({
  workout: workoutSchema,
});

export type Post = z.infer<typeof workoutPostSchema>;
