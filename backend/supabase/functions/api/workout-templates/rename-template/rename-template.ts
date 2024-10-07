import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const renameTemplate: RequestHandler = async (req, user, kwargs) => {
  const { name } = await req.json();
  const id = kwargs.get("id") as number;
  if (!id || !user) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!name) {
    return new Response("Name is required", { status: 400 });
  }
  await supabase_client
    .from("workout_templates")
    .update({ title: name })
    .eq("id", id)
    .single()
    .throwOnError();

  return new Response("OK", { status: 200 });
};
