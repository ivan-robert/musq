import { ExoType } from "#shared/exo/domain/exo.types";

const yKeys = [
  "reps",
  "weight",
  "time_in_seconds",
  "rest_time",
  "intensity",
  "is_pr",
  "failure",
] as const;

type KeyMap = {
  [key in ExoType]: {
    withIntensity: Array<(typeof yKeys)[number]>;
    withoutIntensity: Array<(typeof yKeys)[number]>;
  };
};

const yKeysByExoType: KeyMap = {
  reps: {
    withIntensity: ["intensity", "reps", "failure"],
    withoutIntensity: ["reps", "is_pr", "failure"],
  },
  poids: {
    withIntensity: ["weight", "intensity", "reps", "failure"],
    withoutIntensity: ["weight", "failure"],
  },
  temps: {
    withIntensity: ["time_in_seconds", "intensity"],
    withoutIntensity: ["time_in_seconds"],
  },
};

export const getYKeys = (
  exoType: ExoType,
  showIntensity: "withIntensity" | "withoutIntensity"
) => {
  return yKeysByExoType[exoType][showIntensity];
};

export const getMainKey = (exoType: ExoType) => {
  if (exoType === "reps") {
    return "reps";
  }
  if (exoType === "poids") {
    return "weight";
  }
  if (exoType === "temps") {
    return "time_in_seconds";
  }

  throw new Error("could not find main key for exercise:", exoType);
};
