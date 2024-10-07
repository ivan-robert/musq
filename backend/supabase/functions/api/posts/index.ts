import { Router } from "#shared/infra/server/router.ts";
import { fetch_posts } from "#functions/api/posts/fetch-posts.ts";

import { id_authorized } from "#functions/api/posts/permissions.ts";
import { fetch_post } from "#functions/api/posts/fetch-post.ts";

export const postRouter = new Router("/api/posts");

postRouter.register("GET", "/", fetch_posts, []);
postRouter.register("GET", "/:id:string", fetch_post, [id_authorized]);
