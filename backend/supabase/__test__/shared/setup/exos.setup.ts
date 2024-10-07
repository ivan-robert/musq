import { ExerciseDTO } from "#functions/api/exercises/fetch-exos/infra/types/exercise.dto.ts";
import { supabase_service_client } from "../client.ts";
import { Logger } from "#shared/service/logger.service.ts";

// Array to hold different exercise entries
export const exoEntries: Record<string, ExerciseDTO> = {
  poids: {
    id: "0001",
    bodyPart: "back",
    equipment: "barbell",
    gifUrl: "https://fake-url.com",
    instructions: ["yayaya"],
    name: "Bench press",
    secondaryMuscles: ["biceps", "forearms"],
    target: "lats",
  },

  reps: {
    id: "0002",
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "https://fake-url.com",
    instructions: ["yayaya"],
    name: "Press up",
    secondaryMuscles: ["biceps", "forearms"],
    target: "adductors",
  },
  temps: {
    id: "1512",
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "https://fake-url.com",
    instructions: ["time machine"],
    name: "Planche",
    secondaryMuscles: ["biceps", "forearms"],
    target: "lats",
  },
} as const;

export const createExoEntries = async () => {
  Logger.info("🔨 ---Creating exos--- 🔨");

  const { error } = await supabase_service_client
    .from("exercises_patched")
    .insert({ id: 1, exercises_list: zgeg });
  if (error) console.error(error);
};

const zgeg = [exoEntries.poids, exoEntries.reps, exoEntries.temps];
