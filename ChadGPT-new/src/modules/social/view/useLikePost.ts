import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { likePostAPI, unlikePostAPI } from "#modules/social/infra/likePost.api";
import { postsAtom } from "#shared/store/posts";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

export const useLikePost = () => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUserContext();
  const setPosts = useSetAtom(postsAtom);
  const likePostQuery = useMutation({
    mutationKey: ["likePost", user.id],
    mutationFn: async (postId: string) => {
      return await likePostAPI(supabaseClient, user.id, postId);
    },
    onSuccess: async (postId) => {
      setPosts((prev) => {
        const post = prev[postId];
        return {
          ...prev,
          [postId]: {
            ...post,
            likes: post.didILike ? post.likes : post.likes + 1,
            didILike: true,
          },
        };
      });
    },
  });

  const unlikePostQuery = useMutation({
    mutationKey: ["unlikePost", user.id],
    mutationFn: async (postId: string) => {
      return await unlikePostAPI(supabaseClient, user.id, postId);
    },
    onSuccess: async (postId) => {
      setPosts((prev) => {
        const post = prev[postId];
        return {
          ...prev,
          [postId]: {
            ...post,
            likes: post.didILike ? post.likes - 1 : post.likes,
            didILike: false,
          },
        };
      });
    },
  });

  return { likePostQuery, unlikePostQuery };
};
