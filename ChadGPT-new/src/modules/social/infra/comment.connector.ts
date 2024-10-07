import { BaseComment, RootComment } from "#modules/social/domain/comment.types";
import { CommentDTO } from "#modules/social/infra/comment.dto";
import { fetchCommentsAPI } from "#modules/social/infra/fetchComments.api";

import { timestampzToDate } from "#shared/utils/dateConverter";
import { SupabaseClient } from "@supabase/supabase-js";

export const adaptComment = (rawComment: CommentDTO): BaseComment => {
  return {
    commentId: rawComment.comment_id,
    postId: rawComment.post_id,
    userId: rawComment.user_clerk_id,
    content: rawComment.content,
    createdAt: timestampzToDate(rawComment.created_at),
    replyTo: rawComment.reply_to,
  };
};

export const commentConnector = async (
  supabaseClient: SupabaseClient,
  postId: string
): Promise<RootComment[]> => {
  const rawComments = await fetchCommentsAPI(supabaseClient, postId);
  const adaptedComments = rawComments.map(adaptComment);
  const commentsWithReplies = buildCommentWithReplies(adaptedComments);
  return commentsWithReplies;
};

const buildCommentWithReplies = (comments: BaseComment[]): RootComment[] => {
  const commentsWithReplies: RootComment[] = comments.map((comment) => {
    return {
      ...comment,
      replies: comments
        .filter((reply) => reply.replyTo === comment.commentId)
        .map((reply) => ({ ...reply, replies: [] })),
    };
  });

  return commentsWithReplies.filter((comment) => !comment.replyTo);
};
