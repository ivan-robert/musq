import { z } from "zod";

const emailSchema = z.string().email({ message: "email invalide" });

const passwordSchema = z
  .string()
  .min(1, { message: "Tu as oublié ton mot de passe !" });

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
