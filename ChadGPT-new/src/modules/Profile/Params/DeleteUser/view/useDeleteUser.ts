import { useSupabaseClient } from "#app/supabaseClient";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { ToastService } from "#shared/service/Toast.service";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import * as Keychain from "react-native-keychain";

export const useDeleteUser = () => {
  const { t } = useTranslation("profile");
  const client = useSupabaseClient();

  const { signOut } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await callEdgeFunction(client, "api/profile/user", { method: "DELETE" });
    },
    onSuccess: () => {
      signOut();
      Keychain.resetGenericPassword();
      ToastService.show({
        title: t("settings.byebye"),
        type: "success",
        message: t("settings.yourAccountHasBeenDeleted"),
      });
    },
  });
};
