import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const deleteTemplate: RequestHandler = async (req, user, kwargs) => {
  const id = kwargs.get("id") as number;
  await supabase_client
    .from("workout_templates")
    .delete()
    .eq("id", id)
    .throwOnError();
  return new Response("Deleted", { status: 204 });
};
