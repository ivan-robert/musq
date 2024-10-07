import { SupabaseClient } from "@supabase/supabase-js";
import { adaptComment } from "#modules/social/infra/comment.connector";
import { CommentDTO } from "#modules/social/infra/comment.dto";

export const postCommentAPI = async (
  supabaseClient: SupabaseClient,
  comment: Omit<CommentDTO, "created_at" | "comment_id">
) => {
  const { data, error } = await supabaseClient
    .from("comments")
    .insert([{ ...comment }])
    .select("*");

  if (error) {
    throw error;
  }
  return adaptComment({
    ...comment,
    comment_id: data[0].comment_id,
    created_at: data[0].created_at,
  });
};

export const deleteCommentAPI = async (
  supabaseClient: SupabaseClient,
  commentId: string
) => {
  await supabaseClient.from("comments").delete().eq("comment_id", commentId);
  return commentId;
};
