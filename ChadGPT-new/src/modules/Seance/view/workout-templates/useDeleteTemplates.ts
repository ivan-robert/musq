import { useSupabaseClient } from "#app/supabaseClient";
import { deleteTemplates } from "#modules/Seance/infra/workout-templates/editTemplates";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTemplates = () => {
  const client = useSupabaseClient();
  return useMutation({
    mutationFn: (id__in: number[]) => deleteTemplates(client, id__in),
    mutationKey: ["delete-templates"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["folder"] });
    },
  });
};
