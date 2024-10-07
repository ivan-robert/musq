import { useUserContext } from "#modules/auth/context/User.context";
import { WorkoutFullForm } from "#modules/Seance/domain/workoutFullForm.schema";
import { postWorkoutConnector } from "#modules/Seance/infra/seance/postWorkout.connector";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { queryClient } from "#shared/service/queryClient";
import { ToastService } from "#shared/service/Toast.service";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import i18next from "i18next";
import { useSupabaseClient } from "#app/supabaseClient";
import { s3 } from "#app/s3";

export const usePostWorkout = () => {
  const supabaseClient = useSupabaseClient();
  const { removeOngoingWorkout } = useOngoingWorkout();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const { user } = useUserContext();
  return useMutation({
    mutationKey: ["post-workout"],
    mutationFn: async (workoutData: WorkoutFullForm) => {
      const { data, error } = await postWorkoutConnector(
        supabaseClient,
        workoutData,
        i18next.language
      );
      console.log("data", data, "error", error);
      if (error || !data) {
        throw new Error("Error while posting workout");
      }
      try {
        for (const image of data.images) {
          const localAsset = workoutData.images.find(
            (localImage) => localImage.fileName === image.file_name
          );
          if (!localAsset) break;
          await uploadIllustration({
            localUri: localAsset.uri,
            folder: user.id,
            file_name: image.file_name,
          });
        }
        return data;
      } catch (e) {
        ToastService.show({
          type: "error",
          title: "Error",
          message: "Error while uploading images",
        });
        console.log("error", e);
        await callEdgeFunction(
          supabaseClient,
          axios.getUri({
            url: "/api/workouts/clear",
            params: { post_id: data.post_id, workout_id: data.workout_id },
          })
        );

        throw e;
      }
    },
    onSuccess: async () => {
      navigate("AuthenticatedTabNavigator");
      queryClient.refetchQueries({
        queryKey: ["FETCH_POSTS", user.id],
        type: "all",
      });
      removeOngoingWorkout();
    },
  });
};

const uploadIllustration = async ({
  file_name,
  folder,
  localUri,
}: {
  localUri: string;
  folder: string;
  file_name: string;
}) => {
  try {
    const result = await s3.put({
      local_uri: localUri,
      bucket_key: `${folder}/${file_name}`,
      type: "image/jpeg",
    });

    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
