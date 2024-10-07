import { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_PICTURE_URI } from "#modules/social/domain/constants";
import { PublicUser } from "#modules/social/domain/publicUser.types";
import { PublicUserDTO } from "#modules/social/infra/publicUser.dto";

export const fetchPublicUsersAPI = async (
  supabaseClient: SupabaseClient,
  ids: string[]
): Promise<PublicUserDTO[]> => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .in("clerk_id", ids);
  if (error) {
    throw error;
  }
  return data.map((user) => ({ ...user, user_id: user.id }));
};

const adaptPublicUser = async (
  supabaseClient: SupabaseClient,
  user: PublicUserDTO,
  ownId: string
): Promise<PublicUser> => {
  const { data } = user.profile_picture_filename
    ? supabaseClient.storage
        .from(`profiles/${user.clerk_id}`)
        .getPublicUrl(`${user.profile_picture_filename}`)
    : { data: null };

  const profilePictureURL = data ? data.publicUrl : DEFAULT_PICTURE_URI;

  const { data: followData, error } = await supabaseClient
    .from("followers")
    .select("*")
    .eq("follower_clerk_id", ownId)
    .eq("followed_clerk_id", user.clerk_id)
    .eq("unfollowed", false);
  if (error) {
    throw error;
  }

  return {
    bio: user.bio,
    profilePictureURL,
    username: user.username,
    user_id: user.clerk_id,
    isFollowed: followData.length > 0,
  };
};

export const publicUserConnector = async (
  supabaseClient: SupabaseClient,
  userId: string,
  ownId: string
): Promise<PublicUser> => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("clerk_id", userId);

  if (error) {
    throw error;
  }

  const user = { ...data[0], user_id: userId };

  const jawed = await adaptPublicUser(supabaseClient, user, ownId);

  return jawed;
};
