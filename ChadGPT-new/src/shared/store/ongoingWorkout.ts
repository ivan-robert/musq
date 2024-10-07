import { Workout } from "#modules/Seance/domain/seance.types";
import { atom } from "jotai";
import { Control } from "react-hook-form";

type OngoingWorkout = {
  isOngoing: boolean;
};

export const workoutAtom = atom<OngoingWorkout>({
  isOngoing: false,
});

export const workoutControlAtom = atom<Control<Workout> | null>(null);
