import { supabase_client } from "#shared/client/supabaseClient.ts";
import { PublicUser } from "#shared/infra/types/publicUser.dto.ts";
import { User } from "@clerk/backend";
import { s3 } from "#shared/client/s3.ts";

const DEFAULT_PROFILE_PICTURE_URL = "https://i.sstatic.net/l60Hf.png";

export const get_public_user_map = async (
  id__in: string[],
  querying_user: User
): Promise<Record<string, PublicUser>> => {
  const { data: users } = await supabase_client
    .from("profiles")
    .select("*")
    .in("clerk_id", id__in)
    .throwOnError();

  const { data: iFollow } = await supabase_client
    .from("followers")
    .select("*")
    .eq("follower_clerk_id", querying_user.id)
    .in("followed_clerk_id", id__in)
    .throwOnError();

  if (!iFollow) throw new Error("No followers found");

  const isFollowed = iFollow.reduce<Record<string, boolean>>(
    (acc, f) => ({
      ...acc,
      [f.followed_clerk_id]: true,
    }),
    {}
  );

  if (!users) throw new Error("No users found");

  const user_map: Record<string, PublicUser> = {};

  for (const user of users) {
    const picture_url = await s3.getUrl(
      user.clerk_id + "/" + "profile_picture",
      3600
    );

    console.log("picture_url", picture_url);

    user_map[user.clerk_id] = {
      bio: undefined,
      isFollowed: !!isFollowed[user.clerk_id],
      user_id: user.clerk_id,
      username: user.username ?? "NO USERNAME",
      profilePictureURL: picture_url ?? DEFAULT_PROFILE_PICTURE_URL,
    };
  }

  return user_map;
};

export const get_public_user = async (
  id: string,
  querying_user: User
): Promise<PublicUser> => {
  const { data: user } = await supabase_client
    .from("profiles")
    .select("*")
    .eq("clerk_id", id)
    .single()
    .throwOnError();

  const { data: iFollow } = await supabase_client
    .from("followers")
    .select("*")
    .eq("follower_clerk_id", querying_user.id)
    .eq("followed_clerk_id", id)
    .throwOnError();

  const isFollowed = !!iFollow?.length;

  if (!user) throw new Error("No user found");

  const picture_url = await s3.getUrl(
    user.clerk_id + "/" + "profile_picture",
    3600
  );

  return {
    bio: undefined,
    isFollowed: !!isFollowed,
    user_id: id,
    username: user.username ?? "NO USERNAME",
    profilePictureURL: user.profile_picture_filename
      ? picture_url
      : DEFAULT_PROFILE_PICTURE_URL,
  };
};

// TODO
// const get_public_users = async (id__in: string[]): Promise<PublicUser[]> => {};
