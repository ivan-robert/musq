import { PermissionChecker } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const OwnsWorkout: PermissionChecker = async (req, user) => {
  const full_url = new URL(req.url);
  const workout_id = full_url.searchParams.get("workout_id");
  if (!workout_id || !user) {
    return false;
  }

  const { data: workout } = await supabase_client
    .from("seances")
    .select("user_clerk_id")
    .eq("seance_id", workout_id)
    .single()
    .throwOnError();

  return workout?.user_clerk_id === user.id;
};

export const OwnsObject: PermissionChecker = async (req, user, kwargs) => {
  const id = kwargs.get("id") as string;

  if (!id || !user) {
    return false;
  }

  const { data: workout } = await supabase_client
    .from("seances")
    .select("*")
    .eq("seance_id", id)
    .single()
    .throwOnError();

  return workout?.user_clerk_id === user.id;
};
