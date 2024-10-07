import { s3 } from "#app/s3";
import { UserResource } from "#modules/auth/context/User.context";

import { ImagePickerAsset } from "expo-image-picker";

export const uploadProfilePicture = async (
  user: UserResource,
  file: ImagePickerAsset
) => {
  const imageId = "profile_picture";

  await s3.put({
    local_uri: file.uri,
    bucket_key: `${user.id}/${imageId}`,
    type: "image/jpeg",
  });

  return await s3.getUrl(`${user.id}/${imageId}`);
};
