import { useSupabaseClient } from "#app/supabaseClient";
import { deleteSeanceAPI } from "#modules/Seance/infra/seance/seance.api";
import { getSeancesQueryKey } from "#modules/Seance/view/readSeances/useFetchSeances";
import {
  UserResource,
  useUserContext,
} from "#modules/auth/context/User.context";
import { Post } from "#modules/social/domain/post.types";
import { ToastService } from "#shared/service/Toast.service";
import { Logger } from "#shared/service/logger.service";
import { queryClient } from "#shared/service/queryClient";
import { InfiniteData, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useDeleteSeance = () => {
  const client = useSupabaseClient();
  const { t } = useTranslation("workouts");
  const { user } = useUserContext();
  const { mutate: deleteSeance } = useMutation({
    mutationKey: ["deleteSeance"],
    mutationFn: async (id: string) => {
      deleteSeanceAPI(client, id);
    },
    onError: (error) => {
      ToastService.show({
        message: t("cannotDeleteWorkout"),
        type: "error",
        title: t("common:status.error"),
      });
      Logger.error(error.message);
    },
    onSuccess: (_, seance) => {
      ToastService.show({
        message: t("workoutDeleted"),
        type: "success",
        title: t("common:status.success"),
      });
      queryClient.refetchQueries({ queryKey: getSeancesQueryKey(user.id) });
      deletePostOptimisticUpdate(user, seance);
    },
  });
  return { deleteSeance };
};

const deletePostOptimisticUpdate = (user: UserResource, id: string) => {
  queryClient.setQueryData(
    ["FETCH_POSTS", user.id],
    (data: InfiniteData<Post[]>): InfiniteData<Post[]> => {
      return {
        ...data,
        pages: data.pages.map((page) =>
          page.filter((post) => post.workout?.id && post.workout?.id !== id)
        ),
      };
    }
  );
};
