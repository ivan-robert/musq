import { Exo, ExoType } from "#shared/exo/domain/exo.types";
import { Muscle } from "#shared/muscle/domain/muscle.types";

export type ExoFilter = {
  exoName: string;
  muscles: Muscle[];
  exoType: ExoType;
  useTypeFilter: boolean;
};

type ChangeExoFilterNameAction = {
  type: "CHANGE_EXO_FILTER_NAME";
  newName: string;
};

type ChangeExoFilterTypeAction = {
  type: "CHANGE_EXO_FILTER_TYPE";
  newType: ExoType;
};

type AddMuscleAction = {
  type: "ADD_MUSCLE";
  newMuscle: Muscle;
};

type RemoveMuscleAction = {
  type: "REMOVE_MUSCLE";
  muscleToRemove: Muscle;
};

type ChangeUseTypeFilterAction = {
  type: "CHANGE_USE_TYPE_FILTER";
  newValue: boolean;
};

type ResetFilterAction = {
  type: "RESET_FILTER";
};

export type ExoFilterAction =
  | ChangeExoFilterNameAction
  | ChangeExoFilterTypeAction
  | AddMuscleAction
  | RemoveMuscleAction
  | ChangeUseTypeFilterAction
  | ResetFilterAction;

export const reduceExoFilterData = (
  state: ExoFilter,
  action: ExoFilterAction
): ExoFilter => {
  switch (action.type) {
    case "CHANGE_EXO_FILTER_NAME":
      return { ...state, exoName: action.newName };
    case "CHANGE_EXO_FILTER_TYPE":
      return { ...state, exoType: action.newType };
    case "ADD_MUSCLE":
      return { ...state, muscles: [...state.muscles, action.newMuscle] };
    case "REMOVE_MUSCLE":
      return {
        ...state,
        muscles: state.muscles.filter(
          (muscle) => muscle.muscle_id !== action.muscleToRemove.muscle_id
        ),
      };
    case "CHANGE_USE_TYPE_FILTER":
      return { ...state, useTypeFilter: action.newValue };

    case "RESET_FILTER":
      return initialExoFilter;
    default:
      return state;
  }
};

export const initialExoFilter: ExoFilter = {
  exoName: "",
  muscles: [],
  exoType: "poids",
  useTypeFilter: false,
};

export const filterExos = (exos: Exo[], filter: ExoFilter): Exo[] => {
  let filteredExos = exos;

  if (filter.useTypeFilter) {
    filteredExos = filteredExos.filter((exo) => exo.exoType === filter.exoType);
  }

  filteredExos = filteredExos.filter((exo) => {
    return filter.muscles.every((muscle) => muscle.muscle_name in exo.muscles);
  });

  if (filter.exoName.length > 0) {
    filteredExos = filteredExos.filter((exo) =>
      exo.exoName.toLowerCase().includes(filter.exoName.toLowerCase())
    );
  }

  return filteredExos.sort((a, b) => a.exoName.localeCompare(b.exoName));
};
