import { PermissionChecker } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const hasAccessToFolder: PermissionChecker = async (
  req,
  user,
  kwargs
) => {
  const folder_id = kwargs.get("id") as number;
  if (!folder_id || !user) {
    return false;
  }
  const { data: folder } = await supabase_client
    .from("template_folders")
    .select("owner_clerk_id, is_public")
    .eq("id", folder_id)
    .single()
    .throwOnError();

  return folder?.owner_clerk_id === user.id || !!folder?.is_public;
};

export const ownsAllTemplates: PermissionChecker = async (req, user) => {
  const full_url = new URL(req.url);
  const id__in = full_url.searchParams.get("id__in");
  if (!id__in || !user) {
    return false;
  }
  const ids = id__in
    .split(",")
    .map(Number)
    .filter(Boolean)
    .filter(Number.isInteger);

  const { data: folders } = await supabase_client
    .from("workout_templates__template_folders")
    .select("*")
    .in("template_id", ids)
    .throwOnError();

  if (!folders) {
    return true;
  }

  const folders_ids = folders.map((f) => f.folder_id);

  const { data: folders_data } = await supabase_client
    .from("template_folders")
    .select("owner_clerk_id, is_public")
    .in("id", folders_ids)
    .throwOnError();

  if (!folders_data) {
    return false;
  }

  return folders_data.every((folder) => folder.owner_clerk_id === user.id);
};

export const ownsAllTemplatesInBody: PermissionChecker = async (req, user) => {
  const clone = req.clone();

  const body = await clone.json();

  if (!body.template_ids || !user) {
    return false;
  }

  const ids = body.template_ids;

  const { data: folders } = await supabase_client
    .from("workout_templates__template_folders")
    .select("*")
    .in("template_id", ids)
    .throwOnError();

  if (!folders) {
    return true;
  }

  const folders_ids = folders.map((f) => f.folder_id);

  const { data: folders_data } = await supabase_client
    .from("template_folders")
    .select("owner_clerk_id, is_public")
    .in("id", folders_ids)
    .throwOnError();

  if (!folders_data) {
    return false;
  }

  return folders_data.every((folder) => folder.owner_clerk_id === user.id);
};
