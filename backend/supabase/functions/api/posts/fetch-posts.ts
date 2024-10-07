import { supabase_client } from "#shared/client/supabaseClient.ts";
import { adaptPosts } from "#functions/api/posts/validators/posts.adapter.ts";
import { User } from "@clerk/backend";

export const fetch_posts = async (req: Request, user: User) => {
  const full_url = new URL(req.url);
  const limit = +(full_url.searchParams.get("limit") ?? "10");
  const offset = +(full_url.searchParams.get("offset") ?? "0");
  const posts = await get_posts(user, limit, offset);

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

export const get_posts = async (user: User, limit: number, offset: number) => {
  const authorized_user_ids = await get_authorized_ids(user);
  const { data: posts } = await supabase_client
    .from("posts")
    .select(
      `*,
        media(*),
        seances (*)`
    )
    .in("user_clerk_id", authorized_user_ids)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (!posts) {
    return new Response("No posts found", { status: 404 });
  }

  const adaptedPosts = await adaptPosts(posts, user);

  return adaptedPosts;
};

export const get_authorized_ids = async (user: User): Promise<string[]> => {
  const { data: relations } = await supabase_client
    .from("followers")
    .select("*")
    .eq("follower_clerk_id", user.id)
    .throwOnError();

  const candidates =
    relations?.map((relation) => relation.followed_clerk_id) ?? [];
  const { data: reverse_relations } = await supabase_client
    .from("followers")
    .select("*")
    .in("follower_clerk_id", candidates)
    .throwOnError();

  if (!reverse_relations) {
    throw new Error("No reverse relations found");
  }

  const final_candidates = reverse_relations.filter(
    (el) => el.followed_clerk_id === user.id && !el.unfollowed
  );

  return [...final_candidates.map((el) => el.follower_clerk_id), user.id];
};
