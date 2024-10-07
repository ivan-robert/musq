import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { Folder } from "#modules/Seance/domain/folder.types";
import { Workout } from "#modules/Seance/domain/seance.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { queryClient } from "#shared/service/queryClient";
import { ToastService } from "#shared/service/Toast.service";
import { useMutation } from "@tanstack/react-query";

export const useCopyWorkout = () => {
  const client = useSupabaseClient();
  const { user } = useUserContext();
  return useMutation({
    mutationKey: ["copy-workout"],
    mutationFn: async ({
      folder,
      workout,
      fileName,
    }: {
      workout: Workout;
      folder: Folder;
      fileName: string;
    }) => {
      const { data } = await callEdgeFunction<Folder>(
        client,
        "api/workout-templates/copy-workout",
        {
          body: { workout, folder, fileName },
          method: "POST",
        }
      );
      if (!data) {
        throw new Error("Failed to copy workout");
      }
      return data;
    },
    onSuccess: async (fol: Folder, variables) => {
      await queryClient.setQueryData(
        ["workout-posession", variables.workout.id],
        () => ({ is_possessed: true })
      );
      ToastService.show({
        type: "success",
        title: "Success",
        message: "Workout copied successfully",
      });
      await queryClient.setQueryData(
        ["folders", user.id],
        (oldData: Folder[]) => {
          return [
            ...oldData.filter((f) => f.id !== fol.id),
            { ...fol, count: fol.count + 1 },
          ];
        }
      );
    },
  });
};
