import { useSupabaseClient } from "#app/supabaseClient";
import { PublicUser } from "#modules/social/domain/publicUser.types";
import { followedUsersConnector } from "#modules/social/infra/followedUsers.connector";
import { publicUsersAtom } from "#shared/store/publicUsers";
import { SupabaseClient } from "@supabase/supabase-js";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

const PAGE_SIZE = 20;

const fetch = async (
  client: SupabaseClient,
  page: number,
  user_id: string
): Promise<PublicUser[]> => {
  const postsPage = await followedUsersConnector(client, {
    userId: user_id,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  return postsPage;
};

export const useFollowedUsers = (userId: string) => {
  const client = useSupabaseClient();
  const setPublicUsers = useSetAtom(publicUsersAtom);
  const query = useInfiniteQuery({
    queryKey: ["FETCH_FOLLOWED_USERS", userId],
    queryFn: async ({ pageParam }) => {
      const newUsers = await fetch(client, pageParam, userId);
      newUsers.forEach((user) => {
        setPublicUsers((prev) => ({ ...prev, [user.user_id]: user }));
      });
      return newUsers;
    },

    getNextPageParam: (lastPage: PublicUser[], pages) => {
      if (!lastPage) {
        return 1;
      }
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage: PublicUser[], pages) => {
      if (!firstPage) {
        return undefined;
      }
      if (firstPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length - 1;
    },
    initialPageParam: 1,
    initialData: { pageParams: [1], pages: [] },
    staleTime: 0,
    refetchOnMount: "always",
  });
  return query;
};
