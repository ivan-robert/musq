import { ExerciseDTO } from "../types/exercise.dto.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { muscleSchema } from "#functions/api/exercises/fetch-exos/infra/types/muscles.dto.ts";

const fetchSelfHostedExosAPI = async (): Promise<ExerciseDTO[]> => {
  try {
    const response = await supabase_client
      .from("exercises_patched")
      .select("*");
    if (!response.data) throw new Error("No exos found in database");
    return response.data[0].exercises_list as ExerciseDTO[];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching exercises");
  }
};

export const fetchSelfHostedExos = async (): Promise<ExerciseDTO[]> => {
  const rawExos = await fetchSelfHostedExosAPI();
  return rawExos.map((exo: ExerciseDTO): ExerciseDTO => {
    return {
      ...exo,
      secondaryMuscles: exo.secondaryMuscles.filter(
        (muscle) => muscleSchema.safeParse(muscle).success
      ),
    };
  });
};
