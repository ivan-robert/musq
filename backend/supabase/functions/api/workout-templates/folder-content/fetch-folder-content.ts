import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { PreparedWorkout } from "#shared/infra/types/seance.dto.ts";
import { preparedPerfSchema } from "#shared/infra/types/perf.dto.ts";
import { z } from "@zod";
import { get_public_user } from "#functions/api/profile/fetch-public-user.ts";

export const fetch_folder_content: RequestHandler = async (
  req,
  user,
  kwargs
) => {
  const folder_id = kwargs.get("id") as number;

  const { data } = await supabase_client
    .from("template_folders")
    .select(`*, templates:workout_templates(*)`)
    .eq("id", +folder_id)
    .single()
    .throwOnError();

  if (!data) {
    return new Response("No data", { status: 404 });
  }

  let content: PreparedWorkout[] = [];

  for (const template of data.templates) {
    const parsed_content = z
      .array(preparedPerfSchema)
      .safeParse(template.content);
    if (parsed_content.success) {
      const parsed = parsed_content.data;
      const creator = await get_public_user(template.creator_clerk_id, user);
      const out: PreparedWorkout = {
        creator,
        id: template.id,
        title: template.title,
        description: template.description ?? undefined,
        created_at: template.created_at,
        content: parsed,
      };
      content.push(out);
    }
  }

  return new Response(JSON.stringify(content), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};
