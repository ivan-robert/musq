import { restTimerAtom } from "#shared/store/restTimer";
import { useSetAtom } from "jotai";
import { DateTime } from "luxon";

type RestOptions = {
  timeInSeconds: number;
  onConfirm: (time: number) => void;
};

export const useRestTimer = () => {
  const setRestData = useSetAtom(restTimerAtom);
  const startResting = ({ timeInSeconds, onConfirm }: RestOptions) => {
    if (timeInSeconds <= 0) return;

    setRestData((prev) => ({
      ...prev,
      expiryTimestamp: DateTime.now().plus({ seconds: timeInSeconds }),
      initialTime: timeInSeconds,
      isRestOpen: true,
      onConfirm,
    }));
  };

  return { startResting };
};
