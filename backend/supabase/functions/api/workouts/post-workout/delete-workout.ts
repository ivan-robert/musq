import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const deleteWorkout: RequestHandler = async (req, user, kwargs) => {
  const workout_id = kwargs.get("id") as string;

  await supabase_client
    .from("seances")
    .delete()
    .eq("seance_id", workout_id)
    .throwOnError();

  return new Response("Workout deleted", { status: 200 });
};
