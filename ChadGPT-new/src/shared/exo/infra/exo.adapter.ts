import { TEMPS_IDS } from "#shared/exo/infra/constants";
import { EquipmentDTO } from "#shared/exo/infra/equipment.dto";
import { ExerciseDTO } from "#shared/exo/infra/exercise.dto";
import { MuscleDTO } from "#shared/exo/infra/muscles.dto";
import { Exo, ExoType } from "../../../shared/exo/domain/exo.types";

const SUPPORTED_EQUIPMENTS: EquipmentDTO[] = [
  "barbell",
  "body weight",
  "cable",
  "dumbbell",
  "ez barbell",
  "kettlebell",
  "smith machine",
  "weighted",
];

interface ExoAdapter {
  recieve: (exo: ExerciseDTO) => Exo;
  send: (exo: Omit<Exo, "exoId">) => ExerciseDTO & { user_id: string };
}

const getExoType = (exo: ExerciseDTO): ExoType => {
  const repsEquipment: EquipmentDTO[] = ["body weight", "roller"];
  if (TEMPS_IDS.includes(exo.id)) {
    return "temps";
  }
  if (repsEquipment.includes(exo.equipment)) {
    return "reps";
  }
  return "poids";
};

export const isExoSupported = (exo: ExerciseDTO): boolean => {
  return SUPPORTED_EQUIPMENTS.includes(exo.equipment);
};

export const exoAdapterRecieve = (exo: ExerciseDTO): Exo => {
  const adaptedType = getExoType(exo);
  return {
    exoId: exo.id,
    imageURL: exo.gifUrl,
    exoName: exo.name,
    exoType: adaptedType,
    bodyPart: exo.bodyPart,
    muscles: exo.secondaryMuscles.reduce(
      (acc, muscle) => {
        acc[muscle] = 0.5;
        return acc;
      },
      { [exo.target]: 1 }
    ),
    equipment: exo.equipment,
  };
};

export const exoAdapterSend = (
  exo: Omit<Exo, "exoId">
): ExerciseDTO & { user_id: string } => {
  if (!exo.addedBy) {
    throw new Error("Missing addedBy");
  }
  const targetMuscle = Object.keys(exo.muscles).find(
    (muscle) => exo.muscles[muscle] === 1
  ) as MuscleDTO;
  if (!targetMuscle) {
    throw new Error("Missing target muscle");
  }
  const id = Math.random().toString().slice(2, 16);

  const exo_out: ExerciseDTO & { user_id: string } = {
    id,
    user_id: exo.addedBy,
    name: exo.exoName,
    target: targetMuscle,
    gifUrl: exo.imageURL ?? "",
    equipment: exo.equipment ?? "body weight",
    secondaryMuscles: Object.keys(exo.muscles).filter(
      (muscle) => exo.muscles[muscle] === 0.5
    ) as MuscleDTO[],
    instructions: exo.instructions ?? [""],
    bodyPart: exo.bodyPart,
  };

  return exo_out;
};

export const exoAdapter: ExoAdapter = {
  recieve: exoAdapterRecieve,
  send: exoAdapterSend,
};
