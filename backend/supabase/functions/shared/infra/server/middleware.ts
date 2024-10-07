import { User as ClerkUser } from "@clerk/backend";
import { clerk_client } from "#shared/client/clerkClient.ts";
import { verify } from "@djwt";
import { getEnvVariable } from "#functions/environment.ts";

const CLERK_SECRET_KEY = getEnvVariable("CLERK_JWT_KEY");

async function createHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export const getUser = async (request: Request): Promise<null | ClerkUser> => {
  const accessToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken || !CLERK_SECRET_KEY) {
    return null;
  }

  try {
    const cryptoKey = await createHmacKey(CLERK_SECRET_KEY);
    const payload = await verify(accessToken, cryptoKey);
    const userId = payload.sub;

    if (!userId) {
      return null;
    }
    const user = await clerk_client.users.getUser(userId);
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
