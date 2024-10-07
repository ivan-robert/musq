import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { publicUserConnector } from "#modules/social/infra/fetchPublicUser";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePublicUser = (user_id: string) => {
  const supabaseClient = useSupabaseClient();
  const { user: selfUser } = useUserContext();
  return useSuspenseQuery({
    queryKey: ["publicUser", user_id],
    queryFn: () => publicUserConnector(supabaseClient, user_id, selfUser.id),
    staleTime: 60 * 1000 * 5,
  });
};
