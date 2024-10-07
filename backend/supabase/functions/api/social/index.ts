import { Router } from "#shared/infra/server/router.ts";
import { search_user } from "#functions/api/social/explore/search-user.ts";

export const socialRouter = new Router("/api/social");

socialRouter.register("GET", "/user/search", search_user, []);
