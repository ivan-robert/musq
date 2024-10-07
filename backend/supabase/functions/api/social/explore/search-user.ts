import { RequestHandler } from "#shared/infra/server/types.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const search_user: RequestHandler = async (req, user, kwargs) => {
  const full_url = new URL(req.url);
  const q = full_url.searchParams.get("q") ?? "";
  const limit = +(full_url.searchParams.get("limit") ?? "10");
  const offset = +(full_url.searchParams.get("offset") ?? "0");

  const { data: users } = await supabase_client
    .from("profiles")
    .select("*")
    .range(offset, offset + limit - 1)
    .ilike("username", `%${q}%`)
    .throwOnError();

  if (!users) {
    return new Response("No users found", { status: 404 });
  }

  return new Response(
    JSON.stringify(
      users.map((u) => ({
        user_id: u.clerk_id,
        username: u.username,
        profile_picture_filename: u.profile_picture_filename,
      }))
    ),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
};
