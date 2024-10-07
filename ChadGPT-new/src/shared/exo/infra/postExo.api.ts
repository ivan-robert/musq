import { SupabaseClient } from "@supabase/supabase-js";
import { ExerciseDTO } from "#shared/exo/infra/exercise.dto";
import { Logger } from "#shared/service/logger.service";

export const postExo = async (
  supabaseClient: SupabaseClient,
  exo: ExerciseDTO & { user_id: string }
): Promise<string> => {
  const chacal = await supabaseClient.from("custom_exercises").insert([exo]);
  if (chacal.error) {
    Logger.error(chacal.error.message);
    throw chacal.error;
  }
  return exo.id;
};
