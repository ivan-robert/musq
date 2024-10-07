import { Muscle } from "#shared/muscle/domain/muscle.types";

export type MuscleFilter = {
  muscleName: string;
};

type ChangeExoFilterNameAction = {
  type: "CHANGE_MUSCLE_FILTER_NAME";
  newName: string;
};

type ResetFilterAction = {
  type: "RESET_FILTER";
};

export type MuscleFilterAction = ChangeExoFilterNameAction | ResetFilterAction;

export const reduceMuscles = (
  state: MuscleFilter,
  action: MuscleFilterAction
): MuscleFilter => {
  switch (action.type) {
    case "CHANGE_MUSCLE_FILTER_NAME":
      return {
        ...state,
        muscleName: action.newName,
      };
    case "RESET_FILTER":
      return initialMuscleFilter;
    default:
      return state;
  }
};

export const initialMuscleFilter: MuscleFilter = {
  muscleName: "",
};

export const filterMuscles = (
  muscles: Muscle[],
  filter: MuscleFilter
): Muscle[] => {
  const filteredMuscles = muscles.filter((muscle) =>
    muscle.muscle_name.toLowerCase().includes(filter.muscleName.toLowerCase())
  );

  return filteredMuscles.sort((a, b) =>
    a.muscle_name.localeCompare(b.muscle_name)
  );
};
