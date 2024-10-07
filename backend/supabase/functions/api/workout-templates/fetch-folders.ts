import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { Folder } from "#shared/infra/types/folder.dto.ts";

export const fetch_folders: RequestHandler = async (req, user) => {
  console.log("ICI ATTEMPE");
  const full_url = new URL(req.url);
  const user_id = full_url.searchParams.get("user_id");
  if (!user_id) {
    return new Response("No user_id provided", { status: 400 });
  }

  const baseQuery = supabase_client
    .from("template_folders")
    .select(`*, templates:workout_templates(*)`)
    .eq("owner_clerk_id", user_id);

  const filtered_query =
    user.id === user_id ? baseQuery : baseQuery.eq("is_public", true);

  const { data } = await filtered_query.throwOnError();

  if (!data) {
    return new Response("No data", { status: 404 });
  }

  const folders_to_return: Folder[] = data.map((folder) => ({
    count: folder.templates.length,
    created_at: folder.created_at,
    id: folder.id,
    name: folder.name,
    owner_clerk_id: folder.owner_clerk_id,
    is_public: folder.is_public,
  }));

  return new Response(JSON.stringify(folders_to_return), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};

export const fetch_folder_meta: RequestHandler = async (req, user) => {
  const full_url = new URL(req.url);
  const folder_id_string = full_url.searchParams.get("folder_id");
  if (!folder_id_string) {
    return new Response("No folder_id provided", { status: 400 });
  }
  const folder_id = +folder_id_string;

  const { data: folder } = await supabase_client
    .from("template_folders")
    .select(`*, templates:workout_templates(*)`)
    .eq("id", folder_id)
    .single()
    .throwOnError();

  if (!folder) {
    return new Response("No data", { status: 404 });
  }

  const folder_to_return: Folder = {
    count: folder.templates.length,
    created_at: folder.created_at,
    id: folder.id,
    name: folder.name,
    owner_clerk_id: folder.owner_clerk_id,
    is_public: folder.is_public,
  };

  return new Response(JSON.stringify(folder_to_return), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};
