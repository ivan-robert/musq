import { SupabaseClient } from "@supabase/supabase-js";
import { CommentDTO } from "#modules/social/infra/comment.dto";

export const fetchCommentsAPI = async (
  supabaseClient: SupabaseClient,
  postId: string
): Promise<CommentDTO[]> => {
  const { data, error } = await supabaseClient
    .from("comments")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    throw error;
  }

  return data;
};
