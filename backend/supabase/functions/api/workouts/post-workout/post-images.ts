import { WorkoutWithMetaForm } from "#functions/api/workouts/post-workout/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";
import { User } from "@supabase/supabase-js";

const WORKOUT_ILLUSTRATIONS_BUCKET = "post-pictures";

export const postImages = async (
  images: WorkoutWithMetaForm["images"],
  post_id: string,
  folder: string,
  user: User
) => {
  if (images.some((image) => !image.fileName)) {
    throw new Error("All images must have a fileName");
  }
  const built_images = images.map((image) => {
    const db_image: Omit<Tables<"media">, "id"> = {
      asset_id: image.assetId ?? crypto.randomUUID(),
      file_name: image.fileName!,
      bucket_name: WORKOUT_ILLUSTRATIONS_BUCKET,
      width: image.width,
      uploaded_by_clerk_id: user.id,
      height: image.height,
      file_size: image.fileSize!,
      duration: image.duration ?? null,
      mime_type: image.mimeType ?? null,
      folder,
      type: image.type ?? null,
      created_at: new Date().toISOString(),
    };
    return db_image;
  });

  const { data } = await supabase_client
    .from("media")
    .insert(built_images)
    .throwOnError()
    .select("*");

  if (!data) {
    throw new Error("NO DATA RETURNED WHEN SELECTING UPLOADED IMAGES");
  }

  const relations = data.map((image) => {
    return {
      media_id: image.id,
      post_id,
    };
  });

  const zgegos = await supabase_client
    .from("posts_media")
    .insert(relations)
    .throwOnError();

  return data;
};
