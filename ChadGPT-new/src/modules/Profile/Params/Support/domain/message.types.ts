import { z } from "zod";

export type Message = {
  creationDate: Date;
  content: string;
  userName: string;
  userId: string;
  messageId: string;
};

export const messageContentSchema = z.object({
  message: z
    .string()
    .regex(/\S/, "Message must contain at least one non-space character.")
    .min(1, "Message must not be empty.")
    .max(1000, "Message must be under 1000 characters."),
});
