import { useUserContext } from "#modules/auth/context/User.context";
import { UserData } from "#modules/auth/domain/userData.types";
import { uploadProfilePicture } from "#modules/auth/infra/uploadProfilePicture.api";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";

export const useUploadProfilePicture = () => {
  const { user } = useUserContext();
  return useMutation({
    mutationKey: ["uploadProfilePicture", user.id],
    mutationFn: async (file: ImagePickerAsset) => {
      return uploadProfilePicture(user, file);
    },
    onSuccess: (url) => {
      queryClient.refetchQueries({ queryKey: ["userdata", user.id] });
      queryClient.setQueryData(["userdata", user.id], (data: UserData) => ({
        ...data,
        profilePicture: { publicUrl: url },
      }));
    },
  });
};
