import { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_PICTURE_URI } from "#modules/social/domain/constants";
import { PublicUser } from "#modules/social/domain/publicUser.types";
import { fetchPublicUsersAPI } from "#modules/social/infra/fetchPublicUser";
import { PublicUserDTO } from "#modules/social/infra/publicUser.dto";

export const followedUsersConnector = async (
  supabaseClient: SupabaseClient,
  {
    limit,
    offset,
    userId,
  }: {
    userId: string;
    limit: number;
    offset: number;
  }
): Promise<PublicUser[]> => {
  const followedIds = await fetchFollowedUsersAPI(
    supabaseClient,
    userId,
    limit,
    offset
  );
  const users = await fetchPublicUsersAPI(supabaseClient, followedIds);
  return users.map((user) => adaptFollowedUser(supabaseClient, user));
};

const adaptFollowedUser = (
  supabaseClient: SupabaseClient,
  user: PublicUserDTO
): PublicUser => {
  const { data } = user.profile_picture_filename
    ? supabaseClient.storage
        .from(`profiles/${user.clerk_id}`)
        .getPublicUrl(`${user.profile_picture_filename}`)
    : { data: null };

  const profilePictureURL = data ? data.publicUrl : DEFAULT_PICTURE_URI;

  return {
    bio: user.bio,
    profilePictureURL,
    username: user.username,
    user_id: user.clerk_id,
    isFollowed: true,
  };
};

const fetchFollowedUsersAPI = async (
  supabaseClient: SupabaseClient,
  userId: string,
  limit: number,
  offset: number
): Promise<string[]> => {
  const { data, error } = await supabaseClient
    .from("followers")
    .select("followed_clerk_id")
    .eq("follower_clerk_id", userId)
    .range(offset, limit + offset - 1);
  if (error) {
    throw error;
  }

  return data.map((user) => user.followed_clerk_id);
};
