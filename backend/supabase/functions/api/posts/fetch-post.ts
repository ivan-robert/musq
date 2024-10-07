import { supabase_client } from "#shared/client/supabaseClient.ts";
import { adaptPosts } from "#functions/api/posts/validators/posts.adapter.ts";
import { RequestHandler } from "#shared/infra/server/types.ts";
import { get_authorized_ids } from "#functions/api/posts/fetch-posts.ts";
import { User } from "@clerk/backend";

export const fetch_post: RequestHandler = async (req, user, kwargs) => {
  const id = kwargs.get("id") as string;
  const posts = await get_post(id, user);

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

const get_post = async (id: string, user: User) => {
  const authorized_user_ids = await get_authorized_ids(user);
  const { data: post } = await supabase_client
    .from("posts")
    .select(
      `*,
          media(*),
          seances (*)`
    )
    .eq("post_id", id)
    .in("user_clerk_id", authorized_user_ids)
    .single()
    .throwOnError();

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const [adaptedPost] = await adaptPosts([post], user);

  return adaptedPost;
};
