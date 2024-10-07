import { SupabaseClient } from "@supabase/supabase-js";

export const followUserAPI = async (
  supabaseClient: SupabaseClient,
  srcId: string,
  dstId: string
) => {
  if (srcId === dstId) {
    throw new Error("Cannot follow yourself");
  }
  const { error } = await supabaseClient
    .from("followers")
    .upsert({ source: srcId, destination: dstId, unfollowed: false });
  if (error) {
    throw error;
  }
  return dstId;
};

export const unFollowUserAPI = async (
  supabaseClient: SupabaseClient,
  srcId: string,
  dstId: string
) => {
  if (srcId === dstId) {
    throw new Error("Cannot follow yourself");
  }
  const { error } = await supabaseClient
    .from("followers")
    .update({ unfollowed: true })
    .eq("follower_clerk_id", srcId)
    .eq("followed_clerk_id", dstId);

  if (error) {
    throw error;
  }
  return dstId;
};
