import { z } from "@zod";

export const publicUserSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  profilePictureURL: z.string(),
  bio: z.string().optional(),
  isFollowed: z.boolean(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;
