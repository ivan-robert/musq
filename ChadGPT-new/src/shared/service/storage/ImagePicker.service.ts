import * as ImagePicker from "expo-image-picker";
import { z } from "zod";

export const imagePickerAssetSchema = z.object({
  uri: z.string(),
  assetId: z.string().nullable().optional(),
  width: z.number(),
  height: z.number(),
  type: z.enum(["image", "video"]).optional(),
  fileName: z.string().nullable().optional(),
  fileSize: z.number().optional(),
  exif: z.record(z.any()).nullable().optional(),
  base64: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
  mimeType: z.string().optional(),
});

const pickImage = async (options?: ImagePicker.ImagePickerOptions) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.3,
    allowsMultipleSelection: false,
    exif: false,
    ...options,
  });

  if (!result.canceled) {
    return result.assets;
  }
};

const takePhoto = async (options?: ImagePicker.ImagePickerOptions) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    exif: false,
    ...options,
  });

  if (!result.canceled) {
    return result.assets;
  }
};

interface IImagePicker {
  pickImage: (
    options?: ImagePicker.ImagePickerOptions
  ) => Promise<ImagePicker.ImagePickerAsset[] | undefined>;
  takePhoto: (
    options?: ImagePicker.ImagePickerOptions
  ) => Promise<ImagePicker.ImagePickerAsset[] | undefined>;
}

export const imagePicker: IImagePicker = {
  pickImage,
  takePhoto,
};
