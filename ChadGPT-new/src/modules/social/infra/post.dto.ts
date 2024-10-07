import { z } from "zod";

const postDTOSchema = z.object({
  post_id: z.string(),
  created_at: z.string(),
  illustration_links: z.array(z.string()),
  title: z.string(),
  description: z.string().optional(),
  number_of_likes: z.number(),
  user_id: z.string(),
  workout_id: z.string().optional(),
  number_of_comments: z.number(),
});

const postDBSchema = z.object({
  post_id: z.string(),
  created_at: z.string(),
  illustration_links: z.array(z.string()),
  title: z.string(),
  description: z.string().optional(),
  user_id: z.string(),
  workout_id: z.string().optional(),
});

export type PostDB = z.infer<typeof postDBSchema>;

export type PostDTO = z.infer<typeof postDTOSchema>;
