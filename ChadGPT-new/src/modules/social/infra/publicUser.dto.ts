import { z } from "zod";

const publicUserSchema = z.object({
  clerk_id: z.string(),
  username: z.string(),
  profile_picture_filename: z.string().nullable(),
  bio: z.string().optional(),
});

export type PublicUserDTO = z.infer<typeof publicUserSchema>;
