import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const patchProfile: RequestHandler = async (req, user, kwargs) => {
  const body = await req.json();
  await supabase_client
    .from("profiles")
    .update({
      ...body,
      clerk_id: user.id,
    })
    .eq("clerk_id", user.id)
    .throwOnError();

  return new Response("Profile updated", { status: 200 });
};
