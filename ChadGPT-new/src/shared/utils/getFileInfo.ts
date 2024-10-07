import { SupabaseClient } from "@supabase/supabase-js";

export const getFileLinkFromBucket = (
  supabaseClient: SupabaseClient,
  bucket: string,
  folder: string,
  name: string
) => {
  return supabaseClient.storage
    .from(bucket)
    .getPublicUrl(`${folder}${folder.length ? "/" : ""}${name}`).data.publicUrl;
};
