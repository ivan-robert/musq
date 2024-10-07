import { supabase_client } from "#shared/client/supabaseClient.ts";
import { User } from "@supabase/supabase-js";

export const syncProfiles = async (req: Request, user: User) => {
  const url = new URL(req.url);
  const { data: public_profile, error: public_profile_error } =
    await supabase_client.from("profiles").select("*").eq("clerk_id", user.id);

  if (public_profile_error) {
    throw public_profile_error;
  }

  if (!public_profile.length) {
    await supabase_client.from("profiles").upsert({ clerk_id: user.id });
  }

  const { data: private_profile, error: private_profile_error } =
    await supabase_client
      .from("private_profiles")
      .select("*")
      .eq("clerk_user_id", user.id);

  if (private_profile_error) {
    throw private_profile_error;
  }

  if (!private_profile.length) {
    await supabase_client
      .from("private_profiles")
      .upsert({ clerk_user_id: user.id });
  }

  return new Response("Profiles synchronized", { status: 200 });
};
