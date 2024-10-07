import { z } from "zod";

const usernameSchema = z.string().min(3).max(20);

export const usernameForm = z.object({
  username: usernameSchema,
});
