import { RequestHandler } from "#shared/infra/server/types.ts";
import { clerk_client } from "#shared/client/clerkClient.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const deleteUser: RequestHandler = async (req, user) => {
  const {} = await supabase_client
    .from("profiles")
    .delete()
    .eq("clerk_id", user.id);

  const {} = await supabase_client
    .from("private_profiles")
    .delete()
    .eq("clerk_user_id", user.id);
  const yoyo = await clerk_client.users.deleteUser(user.id);

  const successResponse = new Response(
    JSON.stringify({
      message: `Deleted user with ID ${user.id}`,
    }),
    { headers: { "Content-Type": "application/json" }, status: 200 }
  );
  return successResponse;
};
