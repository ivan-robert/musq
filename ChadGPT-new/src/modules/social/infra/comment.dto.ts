import { z } from "zod";

const commentSchema = z.object({
  comment_id: z.string(),
  created_at: z.string(),
  content: z.string(),
  user_clerk_id: z.string(),
  post_id: z.string(),
  reply_to: z.string().optional(),
});

export type CommentDTO = z.infer<typeof commentSchema>;
