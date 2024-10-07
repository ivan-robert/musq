import { PermissionChecker } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const id_authorized: PermissionChecker = async (req, user, kwargs) => {
  if (!user) {
    return false;
  }
  const id = kwargs.get("id") as string;
  const { data: relations } = await supabase_client
    .from("followers")
    .select("*")
    .eq("follower_clerk_id", user.id)
    .throwOnError();

  const candidates =
    relations?.map((relation) => relation.followed_clerk_id) ?? [];
  const { data: reverse_relations } = await supabase_client
    .from("followers")
    .select("*")
    .in("follower_clerk_id", candidates)
    .throwOnError();

  if (!reverse_relations) {
    throw new Error("No reverse relations found");
  }

  const final_candidates = reverse_relations.filter(
    (el) => el.followed_clerk_id === user.id && !el.unfollowed
  );

  const authorized_user_ids = [
    ...final_candidates.map((el) => el.follower_clerk_id),
    user.id,
  ];

  const { data: post } = await supabase_client
    .from("posts")
    .select("*")
    .eq("post_id", id)
    .in("user_clerk_id", authorized_user_ids)
    .throwOnError();

  return !!post?.length;
};
