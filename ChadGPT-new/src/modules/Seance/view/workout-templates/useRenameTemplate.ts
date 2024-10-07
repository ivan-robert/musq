import { useSupabaseClient } from "#app/supabaseClient";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useRenameTemplate = () => {
  const client = useSupabaseClient();
  return useMutation({
    mutationKey: ["templates", "rename"],
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const { error } = await callEdgeFunction(
        client,
        `api/workout-templates/${id}/rename`,
        {
          method: "PATCH",
          body: { name },
        }
      );

      if (error) {
        throw new Error("Failed to rename template");
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["folder"] });
    },
  });
};
