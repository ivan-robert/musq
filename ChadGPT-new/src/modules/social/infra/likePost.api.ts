import { SupabaseClient } from "@supabase/supabase-js";

export const likePostAPI = async (
  supabaseClient: SupabaseClient,
  userId: string,
  postId: string
): Promise<string> => {
  const { data } = await supabaseClient
    .from("likes")
    .select("*")
    .eq("user_clerk_id", userId)
    .eq("post_id", postId);

  console.log("DATA", data);

  if (data && !data.length) {
    const yaya = await supabaseClient
      .from("likes")
      .insert([{ user_clerk_id: userId, post_id: postId }])
      .select();

    console.log("YAAY", yaya);
  }

  return postId;
};

export const unlikePostAPI = async (
  supabaseClient: SupabaseClient,
  userId: string,
  postId: string
): Promise<string> => {
  const { error } = await supabaseClient
    .from("likes")
    .delete()
    .eq("user_clerk_id", userId)
    .eq("post_id", postId);

  if (error) {
    throw error;
  }
  return postId;
};
