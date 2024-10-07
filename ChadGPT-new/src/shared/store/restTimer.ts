import { atom } from "jotai";
import { DateTime } from "luxon";

type RestTimer = {
  initialTime: number;
  expiryTimestamp: DateTime;
  isRestOpen: boolean;
  onConfirm: (time: number) => void;
};

export const restTimerAtom = atom<RestTimer>({
  initialTime: 0,
  expiryTimestamp: DateTime.now(),
  isRestOpen: false,
  onConfirm: () => {},
});
