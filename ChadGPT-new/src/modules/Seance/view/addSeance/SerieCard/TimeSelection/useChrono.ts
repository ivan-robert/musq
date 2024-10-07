import { DateTime } from "luxon";
import { useCallback, useState } from "react";

export type Chrono = ReturnType<typeof useChrono>;

export const useChrono = (setTimeInSeconds: (a: number) => void) => {
  const [isRunning, setIsChronoRunning] = useState(false);
  const [beginningTime, setBeginningTime] = useState(DateTime.now());
  const [pauseBeginningTime, setPauseBeginningTime] = useState<DateTime | null>(
    null
  );

  const pause = useCallback(() => {
    setIsChronoRunning(false);
    setPauseBeginningTime(DateTime.now());
  }, []);

  const resume = useCallback(
    (beginningTime: DateTime, pauseBeginningTime: DateTime) => {
      setIsChronoRunning(true);
      setBeginningTime(
        beginningTime.plus(DateTime.now().diff(pauseBeginningTime))
      );
      setPauseBeginningTime(null);
    },
    []
  );

  const start = useCallback(() => {
    setBeginningTime(DateTime.now());
    setPauseBeginningTime(null);
    setIsChronoRunning(true);
  }, []);

  const getEllapsedTime = useCallback((beginningTime: DateTime): number => {
    const ellapsed = DateTime.now().diff(beginningTime, "seconds").seconds;
    return Math.round(ellapsed * 10) / 10;
  }, []);

  const reset = useCallback(() => {
    setTimeInSeconds(0);
    setIsChronoRunning(false);
    setPauseBeginningTime(null);
  }, [setTimeInSeconds]);

  return {
    pause,
    resume,
    start,
    getEllapsedTime,
    reset,
    isRunning,
    beginningTime,
    pauseBeginningTime,
  };
};
