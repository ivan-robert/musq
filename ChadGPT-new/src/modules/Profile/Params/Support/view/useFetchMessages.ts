import { useSupabaseClient } from "#app/supabaseClient";
import { Message } from "#modules/Profile/Params/Support/domain/message.types";
import { fetchMessagesConnector } from "#modules/Profile/Params/Support/infra/fetchMessages.connector";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;

const fetch = async (
  client: SupabaseClient,
  page: number,
  channel_id: string
): Promise<Message[]> => {
  const messages = await fetchMessagesConnector(
    client,
    channel_id,
    PAGE_SIZE * (page - 1),
    PAGE_SIZE * page
  );

  return messages;
};

export const useFetchMessages = (channelId: string) => {
  const client = useSupabaseClient();
  return useSuspenseInfiniteQuery({
    queryKey: ["fetchMessages", channelId],
    queryFn: async ({ pageParam }) => {
      const page = await fetch(client, pageParam as number, channelId);
      return page;
    },
    getNextPageParam: (lastPage: Message[], pages) => {
      if (!lastPage) {
        return 1;
      }
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage: Message[], pages) => {
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
  });
};
