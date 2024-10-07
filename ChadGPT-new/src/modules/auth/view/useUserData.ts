import { useSupabaseClient } from "#app/supabaseClient";
import { UserResource } from "#modules/auth/context/User.context";
import { userDataConnector } from "#modules/auth/infra/userData.connector";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useUserData = (user: UserResource) => {
  const client = useSupabaseClient();
  const query = useSuspenseQuery({
    queryKey: ["userdata", user.id],
    queryFn: () => userDataConnector(client, user),
    staleTime: 0,
  });

  return query;
};
