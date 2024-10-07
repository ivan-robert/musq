import { DEFAULT_PROFILE_PICTURE_URL } from "#app/constants";
import { s3 } from "#app/s3";
import { UserResource } from "#modules/auth/context/User.context";
import { UserData } from "#modules/auth/domain/userData.types";
import { syncProfilesAPI } from "#modules/auth/infra/syncProfiles.api";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export const userDataConnector = async (
  supabaseClient: SupabaseClient,
  user: UserResource,
  attempt = 0
): Promise<UserData> => {
  const { data: userData, error: usernameError } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("clerk_id", user.id);

  if (usernameError) {
    throw usernameError;
  }

  if (userData.length === 0) {
    if (attempt > 3) {
      throw new Error("Profile not found");
    }
    await syncProfilesAPI(supabaseClient, user.id);
    return await userDataConnector(supabaseClient, user, attempt + 1);
  }

  let url = await s3.getUrl(`${user.id}/profile_picture`);

  try {
    await axios.get(url);
  } catch (e) {
    url = DEFAULT_PROFILE_PICTURE_URL;
  }

  return { username: userData[0].username, profilePicture: { publicUrl: url } };
};
