import { useSupabaseClient } from "#app/supabaseClient";
import { SearchedPublicUser } from "#modules/social/domain/publicUser.types";
import { searchUserConnector } from "#modules/social/infra/searchUser";
import { SupabaseClient } from "@supabase/supabase-js";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;

const fetch = async (
  supabaseClient: SupabaseClient,
  page: number,
  text: string
): Promise<SearchedPublicUser[]> => {
  const messages = await searchUserConnector(
    supabaseClient,
    text,
    PAGE_SIZE * page,
    PAGE_SIZE * (page - 1)
  );

  return messages;
};

export const useSearchUser = (text: string, shouldSearch: boolean) => {
  const supabaseClient = useSupabaseClient();
  return useInfiniteQuery({
    queryKey: ["searchUser", text],
    queryFn: async ({ pageParam }) => {
      return fetch(supabaseClient, pageParam as number, text);
    },

    getNextPageParam: (lastPage: SearchedPublicUser[], pages) => {
      if (!lastPage) {
        return 1;
      }
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage: SearchedPublicUser[], pages) => {
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
    enabled: shouldSearch,
  });
};
