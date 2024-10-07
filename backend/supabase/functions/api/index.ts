import { Router } from "#functions/shared/infra/server/router.ts";
import { exerciseRouter } from "./exercises/index.ts";
import { workoutRouter } from "./workouts/index.ts";
import { statisticsRouter } from "./statistics/index.ts";
import { profileRouter } from "./profile/index.ts";
import { postRouter } from "#functions/api/posts/index.ts";
import { workoutTemplatesRouter } from "#functions/api/workout-templates/index.ts";
import { Logger } from "#shared/service/logger.service.ts";
import { authRouter } from "#functions/api/auth/index.ts";
import { socialRouter } from "#functions/api/social/index.ts";

const router = new Router("/api");
router.forward("workouts", workoutRouter);
router.forward("exercises", exerciseRouter);
router.forward("statistics", statisticsRouter);
router.forward("profile", profileRouter);
router.forward("posts", postRouter);
router.forward("workout-templates", workoutTemplatesRouter);
router.forward("auth", authRouter);
router.forward("social", socialRouter);

Deno.serve(async (req: Request) => {
  try {
    return await router.handle(req);
  } catch (e) {
    Logger.error(e);
    throw e;
  }
});
