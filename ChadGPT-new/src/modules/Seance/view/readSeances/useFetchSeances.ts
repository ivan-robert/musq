import { useUserContext } from "../../../auth/context/User.context";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dateToDateString } from "#shared/utils/dateConverter";
import { seancesConnector } from "#modules/Seance/infra/seance/seance.connector";
import { useEffect } from "react";
import { queryClient } from "#shared/service/queryClient";
import { Workout } from "#modules/Seance/domain/seance.types";
import { useSupabaseClient } from "#app/supabaseClient";

export const getSeancesQueryKey = (
  user_id: string,
  start_date?: string,
  end_date?: string
) => ["FETCH_SEANCE_BY_DATE", user_id, start_date, end_date];

type useFetchSeancesParams = {
  start_date?: Date;
  end_date?: Date;
};

export const useFetchSeances = ({
  end_date,
  start_date,
}: useFetchSeancesParams) => {
  const client = useSupabaseClient();
  const { user } = useUserContext();
  const start_date_string = start_date
    ? dateToDateString(start_date)
    : undefined;
  const end_date_string = end_date ? dateToDateString(end_date) : undefined;

  const query = useSuspenseQuery({
    queryKey: getSeancesQueryKey(user.id, start_date_string, end_date_string),
    queryFn: async () =>
      await seancesConnector(client, {
        max_date: end_date?.toISOString(),
        min_date: start_date?.toISOString(),
      }),
  });

  useEffect(() => {
    for (const seance of query.data ?? []) {
      queryClient.setQueryData(getBulkSeancesQueryKey([seance.id!]), [seance]);
    }
  }, [query.data, user.id]);

  return query;
};

export const getBulkSeancesQueryKey = (id__in: string[]) => [
  "FETCH_SEANCE",
  id__in,
];

export const useBulkFetchSeances = (id__in: string[]) => {
  const client = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: getBulkSeancesQueryKey(id__in),
    staleTime: Infinity,
    queryFn: async () => {
      const workouts: Workout[] = await seancesConnector(client, { id__in });
      return workouts;
    },
  });
};
