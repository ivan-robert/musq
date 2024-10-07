import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const registerPushNotif: RequestHandler = async (req, user, kwargs) => {
  const user_id = user.id;
  const { expo_push_token } = await req.json();
  const { data } = await supabase_client
    .from("private_profiles")
    .select()
    .eq("clerk_user_id", user_id)
    .throwOnError();

  if (!data?.length) {
    await supabase_client
      .from("private_profiles")
      .upsert({ expo_push_token, clerk_user_id: user_id })
      .throwOnError();
  }

  await supabase_client
    .from("private_profiles")
    .update({ expo_push_token, clerk_user_id: user_id })
    .eq("clerk_user_id", user_id)
    .throwOnError();

  return new Response("Push token registered", { status: 200 });
};
