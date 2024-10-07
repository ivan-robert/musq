import { useSupabaseClient } from "#app/supabaseClient";
import { Folder } from "#modules/Seance/domain/folder.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useMoveTemplates = () => {
  const client = useSupabaseClient();
  return useMutation({
    mutationKey: ["templates", "move"],
    mutationFn: async ({
      folder,
      template_ids,
    }: {
      folder: Folder;
      template_ids: number[];
    }) => {
      const { error } = await callEdgeFunction(
        client,
        "api/workout-templates/move",
        {
          method: "POST",
          body: { folder, template_ids: template_ids },
        }
      );

      if (error) {
        throw new Error("Failed to move templates");
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["folder"] });
    },
  });
};
