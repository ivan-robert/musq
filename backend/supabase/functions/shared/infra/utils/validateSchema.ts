import { ZodSchema } from "@zod";

export const validateSchema = (schema: ZodSchema, data: unknown) => {
  try {
    schema.parse(data);
  } catch (error) {
    console.error(error);
    return new Response("bad request", {
      status: 400,
    });
  }
};
