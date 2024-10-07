import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const clearWorkout: RequestHandler = async (req, user) => {
  const full_url = new URL(req.url);
  const post_id = full_url.searchParams.get("post_id");

  if (!post_id) {
    return new Response("No workout_id provided", { status: 400 });
  }
  const { data } = await supabase_client
    .from("posts")
    .select("*")
    .eq("post_id", post_id);

  const workout_id = data?.[0].workout_id;

  if (!workout_id) {
    return new Response("Workout not found", { status: 404 });
  }

  await supabase_client
    .from("seances")
    .delete()
    .eq("seance_id", workout_id)
    .single()
    .throwOnError();

  const { data: media_to_delete } = await supabase_client
    .from("posts_media")
    .select("*")
    .eq("post_id", post_id)
    .throwOnError();

  if (media_to_delete) {
    await supabase_client
      .from("posts_media")
      .delete()
      .eq("post_id", post_id)
      .throwOnError();

    await supabase_client
      .from("media")
      .delete()
      .in(
        "id",
        media_to_delete.map((media) => media.media_id)
      )
      .throwOnError();
  }

  return new Response("Workout deleted", { status: 200 });
};
