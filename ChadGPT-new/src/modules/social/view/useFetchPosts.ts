import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { Post } from "#modules/social/domain/post.types";
import {
  fetchPost,
  fetchPosts,
} from "#modules/social/infra/fetchPosts.connector";
import { postsAtom } from "#shared/store/posts";
import { SupabaseClient } from "@supabase/supabase-js";

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useSetAtom } from "jotai";

const PAGE_SIZE = 10;

export const useFetchPost = (postId: string) => {
  const client = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const posts = await fetchPost(client, postId);

      return posts;
    },
  });
};

const fetch_page = async (
  client: SupabaseClient,
  page: number
): Promise<Post[]> => {
  const postsPage = await fetchPosts(client, {
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  return postsPage;
};

export const getFetchPostsQueryKey = (userId: string) => [
  "FETCH_POSTS",
  userId,
];

export const useFetchPosts = () => {
  const client = useSupabaseClient();
  const setPosts = useSetAtom(postsAtom);
  const { user } = useUserContext();
  const query = useSuspenseInfiniteQuery({
    queryKey: getFetchPostsQueryKey(user.id),
    queryFn: async ({ pageParam }) => {
      const newPosts = await fetch_page(client, pageParam);
      newPosts.forEach((post) => {
        setPosts((prev) => ({ ...prev, [post.postId]: post }));
      });
      return newPosts;
    },

    getNextPageParam: (lastPage: Post[], pages) => {
      if (!lastPage) {
        return 1;
      }
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage: Post[], pages) => {
      return pages.length - 1 <= 0 ? undefined : pages.length - 1;
    },
    initialPageParam: 1,
    initialData: { pageParams: [1], pages: [] },
  });
  return query;
};
