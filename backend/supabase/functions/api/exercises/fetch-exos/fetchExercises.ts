import { z } from "@zod";
import { fetchSelfHostedExos } from "./infra/api/fetchExos.ts";
import { User } from "@supabase/supabase-js";
import { Exercise, exoSchema } from "#shared/infra/types/exercise.dto.ts";
import { get_exo_type } from "#functions/api/exercises/fetch-exos/get-exotype.ts";

export const fetchExercises = async (req: Request, user: User) => {
  const exercises = await get_exercise_map(user);

  try {
    z.record(exoSchema).parse(exercises);
  } catch (error) {
    console.error(error);
    return new Response(
      "Error while fetching exercises, the response does not have a valid schema",
      { status: 500 }
    );
  }

  return new Response(JSON.stringify(exercises), {
    headers: { "Content-Type": "application/json", status: "200" },
  });
};

export const get_exercise_map = async (
  user: User
): Promise<Record<string, Exercise>> => {
  const exercises = await fetchSelfHostedExos();
  return exercises.reduce<Record<string, Exercise>>((acc, exo) => {
    acc[exo.id] = {
      bodyPart: exo.bodyPart,
      exoName: exo.name,
      equipment: exo.equipment,
      imageURL: exo.gifUrl,
      instructions: exo.instructions,
      exoId: exo.id,
      exoType: get_exo_type(exo),
      muscles: {
        [exo.target]: 1,
        ...exo.secondaryMuscles.reduce(
          (acc, muscle) => ({ ...acc, [muscle]: 0.5 }),
          {}
        ),
      },
    };
    return acc;
  }, {} as Record<string, Exercise>);
};

export const get_universal_exercise_map = async (
  user_id__in: string[]
): Promise<Record<string, Exercise>> => {
  const exercises = await fetchSelfHostedExos();
  return exercises.reduce<Record<string, Exercise>>((acc, exo) => {
    acc[exo.id] = {
      bodyPart: exo.bodyPart,
      exoName: exo.name,
      equipment: exo.equipment,
      imageURL: exo.gifUrl,
      instructions: exo.instructions,
      exoId: exo.id,
      exoType: get_exo_type(exo),
      muscles: {
        [exo.target]: 1,
        ...exo.secondaryMuscles.reduce(
          (acc, muscle) => ({ ...acc, [muscle]: 0.5 }),
          {}
        ),
      },
    };
    return acc;
  }, {} as Record<string, Exercise>);
};
