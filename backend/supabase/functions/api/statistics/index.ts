import { Router } from "#shared/infra/server/router.ts";
import { computeMonthlyStatistics } from "./monthly/computeMonthlyStatistics.ts";
import { computeExerciseStatistics } from "./exercise/computeExerciseStatistics.ts";

export const statisticsRouter = new Router("/api/statistics");
statisticsRouter.register("POST", "/monthly", computeMonthlyStatistics);
statisticsRouter.register("POST", "/exercise", computeExerciseStatistics);
