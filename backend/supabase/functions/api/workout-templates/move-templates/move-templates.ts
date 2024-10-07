import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { folderSchema } from "#shared/infra/types/folder.dto.ts";

export const moveTemplates: RequestHandler = async (req, user, kwargs) => {
  const { folder, template_ids } = await req.json();

  if (!folder || !template_ids) {
    return new Response(null, { status: 400, statusText: "Bad Request" });
  }

  const parsedfolder = folderSchema.parse(folder);

  let folder_id = parsedfolder.id;

  if (!folder_id) {
    const { data } = await supabase_client
      .from("template_folders")
      .insert([parsedfolder])
      .select("id")
      .single()
      .throwOnError();

    if (!data) {
      return new Response(null, {
        status: 500,
        statusText: "Failed creating new folder",
      });
    }

    folder_id = data.id;
  }

  const entries = template_ids.map((template_id: number) => ({
    folder_id,
    template_id,
  }));
  await supabase_client
    .from("workout_templates__template_folders")
    .upsert(entries)
    .throwOnError();

  return new Response("Success", { status: 200, statusText: "Moved" });
};
