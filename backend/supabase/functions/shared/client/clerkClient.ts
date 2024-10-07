import { createClerkClient } from "@clerk/backend";
import { getEnvVariable } from "#functions/environment.ts";

export const clerk_client = createClerkClient({
  secretKey: getEnvVariable("CLERK_SECRET_KEY"),
});
