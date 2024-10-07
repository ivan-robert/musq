import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { Logger } from "#shared/service/logger.service.ts";

export const deleteTemplates: RequestHandler = async (req, user, kwargs) => {
  const full_url = new URL(req.url);
  const ids = full_url.searchParams.get("id__in");
  if (!ids) {
    return new Response(null, { status: 400, statusText: "Bad Request" });
  }
  const ids_list = ids
    .split(",")
    .map(Number)
    .filter(Boolean)
    .filter(Number.isInteger);

  const { error } = await supabase_client
    .from("workout_templates")
    .delete()
    .in("id", ids_list)
    .throwOnError();

  if (error) {
    Logger.error("error deleting templates", error);
  }

  return new Response(null, { status: 204, statusText: "Deleted" });
};
