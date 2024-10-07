import { useSupabaseClient } from "#app/supabaseClient";
import { commentConnector } from "#modules/social/infra/comment.connector";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useFetchComments = (postId: string) => {
  const supabaseClient = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: ["FETCH_COMMENTS", postId],
    queryFn: () => {
      return commentConnector(supabaseClient, postId);
    },
  });
};
