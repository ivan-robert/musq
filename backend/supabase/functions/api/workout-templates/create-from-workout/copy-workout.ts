import { RequestHandler } from "#shared/infra/server/types.ts";
import {
  WorkoutDTO,
  workoutDTOSchema,
} from "#shared/infra/types/seance.dto.ts";
import { get_prepared_workout_from_workout } from "#functions/api/workout-templates/create-from-workout/generate-from-workout.ts";
import { Folder, folderSchema } from "#shared/infra/types/folder.dto.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";

export const copy_workout: RequestHandler = async (req, user) => {
  const { workout, folder, fileName } = (await req.json()) as {
    workout: WorkoutDTO;
    folder: Folder;
    fileName: string;
  };
  folderSchema.parse(folder);
  workoutDTOSchema.parse(workout);
  let folder_id = folder.id;
  if (!folder_id) {
    const { data: folder_data } = await supabase_client
      .from("template_folders")
      .insert({
        name: folder.name,
        owner_clerk_id: folder.owner_clerk_id,
        is_public: folder.is_public,
      })
      .select()
      .single()
      .throwOnError();

    folder_id = folder_data!.id;
  }
  if (workout.template_id) {
    await supabase_client.from("workout_templates__template_folders").insert({
      folder_id,
      template_id: workout.template_id,
    });

    return new Response("Workout copied", { status: 200 });
  }

  const template = await get_prepared_workout_from_workout(workout, user);

  const { data: template_data } = await supabase_client
    .from("workout_templates")
    .insert({
      title: fileName,
      description: template.description,
      creator_clerk_id: workout.userId,
      content: template.content,
      is_public: false,
      copied_from_workout: workout.id,
    })
    .select("*")
    .single()
    .throwOnError();

  await supabase_client.from("workout_templates__template_folders").insert({
    folder_id,
    template_id: template_data!.id,
  });

  return new Response("Workout copied", { status: 200 });
};
