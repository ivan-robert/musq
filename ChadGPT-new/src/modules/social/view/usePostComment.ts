import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { RootComment } from "#modules/social/domain/comment.types";
import { postCommentAPI } from "#modules/social/infra/postComment.api";
import {
  commentContentAtom,
  replyingToAtom,
} from "#modules/social/view/comments.store";
import { queryClient } from "#shared/service/queryClient";
import { postsAtom } from "#shared/store/posts";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

export const usePostComment = (postId: string) => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUserContext();
  const setPosts = useSetAtom(postsAtom);
  const [replyingTo, setIsReplyingTo] = useAtom(replyingToAtom);
  const setCommentContent = useSetAtom(commentContentAtom);
  return useMutation({
    mutationKey: ["POST_COMMENT", user.id],
    mutationFn: async ({ content }: { content: string }) => {
      return await postCommentAPI(supabaseClient, {
        content,
        reply_to: replyingTo?.commentId,
        user_clerk_id: user.id,
        post_id: postId,
      });
    },
    onSuccess: (newComment) => {
      setCommentContent("");
      setIsReplyingTo(null);
      const newRootComment: RootComment = {
        ...newComment,
        replies: [],
      };
      queryClient.setQueryData(
        ["FETCH_COMMENTS", postId],
        (data: RootComment[]): RootComment[] => {
          if (!replyingTo) {
            return [...data, newRootComment];
          }
          return data.map((comment) => {
            if (comment.commentId === replyingTo.commentId) {
              return {
                ...comment,
                replies: [...comment.replies, newRootComment],
              };
            }
            return comment;
          });
        }
      );
      setPosts((prev) => {
        return {
          ...prev,
          [postId]: {
            ...prev[postId],
            nbComments: prev[postId].nbComments + 1,
          },
        };
      });
    },
  });
};
