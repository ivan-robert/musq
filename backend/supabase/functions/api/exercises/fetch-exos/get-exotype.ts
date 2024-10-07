import { ExerciseDTO } from "#functions/api/exercises/fetch-exos/infra/types/exercise.dto.ts";

const TIME_EXO_IDS = [
  "1512",
  "2333",
  "3297",
  "3296",
  "1405",
  "0020",
  "2135",
  "827",
];

const REPS_EQUIPMENT = ["body weight", "roller"];

export const get_exo_type = (
  exercise: ExerciseDTO
): "reps" | "temps" | "poids" => {
  if (TIME_EXO_IDS.includes(exercise.id)) {
    return "temps";
  }
  if (REPS_EQUIPMENT.includes(exercise.equipment)) {
    return "reps";
  }
  return "poids";
};
