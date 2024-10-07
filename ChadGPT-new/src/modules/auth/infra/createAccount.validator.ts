import { z } from "zod";

const emailSchema = z.string().email({ message: "email invalide" });

export const passwordLengthScheme = z
  .string()
  .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" });

export const passwordCapsSchema = z.string().regex(/[A-Z]/).regex(/[a-z]/);

export const passwordNumberSchema = z
  .string()
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre");

const passwordSchema = passwordLengthScheme
  .and(passwordCapsSchema)
  .and(passwordNumberSchema);

export const createAccountCredentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: z.string(),
});

export type PasswordValidationResults = {
  min?: boolean;
  uppercase?: boolean;
  number?: boolean;
};

type Criterion = {
  key: "min" | "uppercase" | "number";
  message: string;
  schema: typeof passwordLengthScheme;
};

export const passwordValidationCriteria: Criterion[] = [
  {
    key: "min",
    message: "eightCharacters",
    schema: passwordLengthScheme,
  },
  {
    key: "uppercase",
    message: "capLetter",
    schema: passwordCapsSchema,
  },
  {
    key: "number",
    message: "oneNumber",
    schema: passwordNumberSchema,
  },
];
