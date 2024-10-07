import { useSupabaseClient } from "#app/supabaseClient";
import { Folder } from "#modules/Seance/domain/folder.types";
import { deleteFolder } from "#modules/Seance/infra/workout-templates/editTemplates";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { queryClient } from "#shared/service/queryClient";
import { ToastService } from "#shared/service/Toast.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFolder = () => {
  const client = useSupabaseClient();
  return useMutation({
    mutationFn: async (id: number) => await deleteFolder(client, id),
    mutationKey: ["delete-folder"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["folder"] });
      ToastService.show({
        type: "success",
        message: "Folder deleted",
        title: "Success",
      });
    },
  });
};

export const useUpdateFolder = () => {
  const client = useSupabaseClient();
  return useMutation({
    mutationFn: async ({
      folder,
      folderId,
    }: {
      folderId: number;
      folder: Partial<Folder>;
    }) => {
      const { error } = await callEdgeFunction(
        client,
        `api/workout-templates/folder/${folderId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ folder }),
        }
      );

      if (error) {
        throw new Error("Failed to delete template");
      }
    },
    mutationKey: ["folder", "patch"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["folder"] });
    },
  });
};
