import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { Folder } from "#shared/infra/types/folder.dto.ts";

export const deleteFolder: RequestHandler = async (req, user, kwargs) => {
  const id = kwargs.get("id") as number;
  await supabase_client
    .from("template_folders")
    .delete()
    .eq("id", id)
    .throwOnError();
  return new Response(null, { status: 204, statusText: "Deleted" });
};

export const patchFolder: RequestHandler = async (req, user, kwargs) => {
  const { folder } = await req.json();

  const id = kwargs.get("id") as number;
  await supabase_client.from("template_folders").update(folder).eq("id", id);
  return new Response(null, { status: 204, statusText: "Deleted" });
};
