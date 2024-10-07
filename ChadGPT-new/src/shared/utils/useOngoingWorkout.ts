import { GenericPerf, perfSchema } from "#modules/Seance/domain/perf.types";
import {
  PreparedWorkout,
  preparedWorkoutSchema,
  Workout,
  workoutSchema,
} from "#modules/Seance/domain/seance.types";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import { ToastService } from "#shared/service/Toast.service";
import { workoutAtom } from "#shared/store/ongoingWorkout";
import { useSetAtom } from "jotai";

export const retrieveOngoingWorkout = (): Omit<
  Workout,
  "endDate" | "salle"
> | null => {
  const workout = LocalStorage.getStringItem("workout");
  if (!workout) return null;
  const parsedWorkout = JSON.parse(workout);

  const isWorkoutValid = workoutSchema
    .omit({ endDate: true, salle: true })
    .safeParse(parsedWorkout).success;

  if (!isWorkoutValid) {
    ToastService.show({
      type: "error",
      message:
        "We encountered an error while retrieving your workout. Please contact support if this happens again.",
      title: "Error",
    });
    return null;
  }

  if (!parsedWorkout.perfs?.length) {
    return null;
  }

  return parsedWorkout;
};

const saveOngoingWorkout = (workout: Workout) => {
  LocalStorage.setStringItem("workout", JSON.stringify(workout));
};

const retrieveCurrentTemplate = (): PreparedWorkout | null => {
  const workout = LocalStorage.getStringItem("current_workout_template");
  if (!workout) return null;
  const parsedWorkout = JSON.parse(workout);

  if (
    !parsedWorkout ||
    !preparedWorkoutSchema.safeParse(JSON.parse(workout)).success
  ) {
    return null;
  }

  return parsedWorkout;
};

const saveCurrentTemplate = (template: PreparedWorkout) => {
  LocalStorage.setStringItem(
    "current_workout_template",
    JSON.stringify(template)
  );
};

const retrieveOngoingPerf = (): GenericPerf | null => {
  const perf = LocalStorage.getStringItem("ongoing_perf");
  if (!perf) return null;
  const rawPerf = JSON.parse(perf);
  const { success } = perfSchema.safeParse(rawPerf);
  if (!success) return null;
  return rawPerf;
};

const saveOngoingPerf = (perf: GenericPerf) => {
  LocalStorage.setStringItem("ongoing_perf", JSON.stringify(perf));
};

const removeOngoingPerf = () => {
  LocalStorage.removeItem("ongoing_perf");
};

export const useOngoingWorkout = () => {
  const setOngoingWorkout = useSetAtom(workoutAtom);
  const removeOngoingWorkout = () => {
    LocalStorage.removeItem("workout");
    LocalStorage.removeItem("ongoing_perf");
    LocalStorage.removeItem("current_workout_template");

    setOngoingWorkout({ isOngoing: false });
  };
  const renderOngoingWorkout = () => {
    setOngoingWorkout((prev) => ({ ...prev }));
  };
  return {
    removeOngoingWorkout,
    retrieveOngoingWorkout,
    retrieveOngoingPerf,
    saveOngoingPerf,
    removeOngoingPerf,
    renderOngoingWorkout,
    retrieveCurrentTemplate,
    saveOngoingWorkout,
    saveCurrentTemplate,
  };
};
