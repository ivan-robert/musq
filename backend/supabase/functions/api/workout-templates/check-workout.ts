import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const check_workout_posessed: RequestHandler = async (req, user) => {
  const workout_id = new URL(req.url).searchParams.get("workout_id");
  if (!workout_id) {
    return new Response("No workout_id provided", { status: 400 });
  }
  const { data: workout } = await supabase_client
    .from("seances")
    .select("template_id")
    .eq("seance_id", workout_id)
    .single()
    .throwOnError();

  if (!workout?.template_id) {
    const { data } = await supabase_client
      .from("workout_templates")
      .select("*")
      .eq("copied_from_workout", workout_id)
      .throwOnError();
    const response = { is_possessed: !!data?.length };
    return new Response(JSON.stringify(response), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }

  const { data: folders } = await supabase_client
    .from("template_folders")
    .select(`*`)
    .eq("owner_id", user.id)
    .throwOnError();

  if (!folders) {
    throw new Error("No data");
  }

  const { data: workout_template } = await supabase_client
    .from("workout_templates__template_folders")
    .select("*")
    .eq("template_id", workout.template_id)
    .in(
      "folder_id",
      folders.map((f) => f.id)
    )
    .throwOnError();

  const response = { is_possessed: !!workout_template?.length };
  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};
