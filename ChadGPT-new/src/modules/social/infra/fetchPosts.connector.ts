import { Post } from "#modules/social/domain/post.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { ToastService } from "#shared/service/Toast.service";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

type FetchPostAPIParams = {
  limit: number;
  offset: number;
};

export const fetchPosts = async (
  client: SupabaseClient,
  params: FetchPostAPIParams
): Promise<Post[]> => {
  const { data, error } = await callEdgeFunction<Post[]>(
    client,
    axios.getUri({ baseURL: "api/posts/", params }),
    { method: "GET" }
  );

  if (error) {
    throw error;
  }
  if (!data) return [];

  return data.map(adaptPost);
};

const adaptPost = (post: Post): Post => {
  return {
    ...post,
  };
};

export const fetchPost = async (
  client: SupabaseClient,
  postId: string
): Promise<Post> => {
  const { data, error } = await callEdgeFunction<Post>(
    client,
    `api/posts/${postId}`,
    {
      method: "GET",
    }
  );

  if (!data || error) {
    ToastService.show({
      message: "Post not found",
      type: "error",
      title: "Error",
    });

    throw new Error("Post not found");
  }

  return adaptPost(data);
};
