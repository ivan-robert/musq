import { Router } from "#functions/shared/infra/server/router.ts";
import { fetchExercises } from "./fetch-exos/fetchExercises.ts";
import { fetchMostPerformedExercises } from "#functions/api/exercises/most-performed.ts";

export const exerciseRouter = new Router("/api/exercises");

exerciseRouter.register("GET", "/", fetchExercises, []);
exerciseRouter.register(
  "GET",
  "/most-performed/",
  fetchMostPerformedExercises,
  []
);
