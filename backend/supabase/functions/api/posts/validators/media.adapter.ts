import { Media } from "#shared/infra/types/media.dto.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";

export const adapt_media = (media: Tables<"media">): Media => {
  return {
    asset_id: media.asset_id,
    bucket_name: media.bucket_name,
    created_at: media.created_at,
    file_name: media.file_name,
    file_size: media.file_size,
    folder: media.folder,
    height: media.height,
    id: media.id,
    mime_type: media.mime_type!,
    uploaded_by: media.uploaded_by_clerk_id!,
    width: media.width,
    ...(media.duration
      ? { duration: media.duration, type: "video" }
      : { type: "image" }),
  };
};
