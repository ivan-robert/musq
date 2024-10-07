import { Router } from "#shared/infra/server/router.ts";
import { fetch_prepared_workout_from_workout } from "#functions/api/workout-templates/create-from-workout/generate-from-workout.ts";
import { fetch_folder_content } from "./folder-content/fetch-folder-content.ts";
import {
  hasAccessToFolder,
  ownsAllTemplates,
  ownsAllTemplatesInBody,
} from "#functions/api/workout-templates/permissions.ts";
import {
  fetch_folder_meta,
  fetch_folders,
} from "#functions/api/workout-templates/fetch-folders.ts";
import { check_workout_posessed } from "#functions/api/workout-templates/check-workout.ts";
import { copy_workout } from "#functions/api/workout-templates/create-from-workout/copy-workout.ts";
import { deleteTemplate } from "./template-edition/edit-template.ts";
import {
  deleteFolder,
  patchFolder,
} from "#functions/api/workout-templates/folder-edition/edit-folder.ts";
import { deleteTemplates } from "#functions/api/workout-templates/delete-templates/delete-templates.ts";
import { moveTemplates } from "#functions/api/workout-templates/move-templates/move-templates.ts";
import { renameTemplate } from "#functions/api/workout-templates/rename-template/rename-template.ts";

export const workoutTemplatesRouter = new Router("/api/workout-templates");
workoutTemplatesRouter.register(
  "GET",
  "/get-from-workout",
  fetch_prepared_workout_from_workout
);
workoutTemplatesRouter.register("GET", "/folders", fetch_folders, []);
workoutTemplatesRouter.register(
  "GET",
  "/check-possessed",
  check_workout_posessed,
  []
);
workoutTemplatesRouter.register("POST", "/copy-workout", copy_workout, []);
workoutTemplatesRouter.register(
  "GET",
  "/folder/:id:number/meta",
  fetch_folder_meta,
  [hasAccessToFolder]
);
workoutTemplatesRouter.register(
  "DELETE",
  "/templates/:id:number",
  deleteTemplate,
  []
);
workoutTemplatesRouter.register(
  "DELETE",
  "/folder/:id:number",
  deleteFolder,
  []
);

workoutTemplatesRouter.register("PATCH", "/folder/:id:number", patchFolder, []);

workoutTemplatesRouter.register(
  "PATCH",
  "/:id:number/rename",
  renameTemplate,
  []
);

workoutTemplatesRouter.register(
  "GET",
  "/folder/:id:number/content",
  fetch_folder_content,
  [hasAccessToFolder]
);

workoutTemplatesRouter.register("DELETE", "/templates", deleteTemplates, [
  ownsAllTemplates,
]);

workoutTemplatesRouter.register("POST", "/move", moveTemplates, [
  ownsAllTemplatesInBody,
]);
