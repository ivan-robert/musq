import { useSupabaseClient } from "#app/supabaseClient";
import { setUsernameAPI } from "#modules/Profile/Username/infra/setUsername.api";
import { useUserContext } from "#modules/auth/context/User.context";
import { UserData } from "#modules/auth/domain/userData.types";
import { ToastService } from "#shared/service/Toast.service";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useSetUsername = () => {
  const client = useSupabaseClient();
  const { t } = useTranslation("common");
  const { user } = useUserContext();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      await setUsernameAPI(client, username);
    },
    onError: () => {
      ToastService.show({
        type: "error",
        message: t("anErrorOccured"),
        title: "Erreur",
      });
    },
    onSuccess: async (_, variables) => {
      await queryClient.setQueryData(
        ["userdata", user.id],
        (data: UserData) => {
          return { ...data, username: variables.username };
        }
      );
    },
  });
  return { mutate, isPending, isError };
};
