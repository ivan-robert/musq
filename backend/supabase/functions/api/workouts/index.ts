import { Router } from "#functions/shared/infra/server/router.ts";
import { postWorkout } from "#functions/api/workouts/post-workout/post-workout.ts";
import { fetch_workouts } from "#functions/api/workouts/fetch-workouts/infra/api/fetch-workouts.ts";
import { clearWorkout } from "#functions/api/workouts/post-workout/clear-workout.ts";
import {
  OwnsObject,
  OwnsWorkout,
} from "#functions/api/workouts/post-workout/permissions.ts";
import { deleteWorkout } from "#functions/api/workouts/post-workout/delete-workout.ts";

export const workoutRouter = new Router("/api/workouts");
workoutRouter.register("GET", "/", fetch_workouts, []);
workoutRouter.register("POST", "/", postWorkout, []);
workoutRouter.register("POST", "/clear", clearWorkout, [OwnsWorkout]);
workoutRouter.register("DELETE", "/:id:string", deleteWorkout, [OwnsObject]);
