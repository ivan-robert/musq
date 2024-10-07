import { Workout } from "#modules/Seance/domain/seance.types";
import { MarkedDates } from "react-native-calendars/src/types";
import { DateTime } from "luxon";
import { Theme } from "@emotion/react";

const getDayDifference = (beforeDate: DateTime, afterDate: DateTime) => {
  const diff = afterDate.startOf("day").diff(beforeDate.startOf("day"), "days");
  return diff.days;
};

export const getMarkedDates = (
  seances: Workout[],
  selected: string,
  theme: Theme
) => {
  const markedDays = seances.reduce((result, seance, index) => {
    const formattedDate = DateTime.fromISO(seance.startDate).toFormat(
      "yyyy-MM-dd"
    );

    const isStartingDay =
      index === seances.length - 1 ||
      !seances.some((s) => {
        return (
          getDayDifference(
            DateTime.fromISO(s.startDate),
            DateTime.fromISO(seance.endDate)
          ) === 1
        );
      });

    const isEndingDay =
      index === 0 ||
      !seances.some(
        (s) =>
          getDayDifference(
            DateTime.fromISO(seance.startDate),
            DateTime.fromISO(s.endDate)
          ) === 1
      );

    result[formattedDate] = {
      marked: true,
      startingDay: isStartingDay,
      endingDay: isEndingDay,
      color: theme.colors.secondary500,
      dotColor: "transparent",
      textColor: theme.colors.text500,
    };

    return result;
  }, {} as MarkedDates);

  markedDays[selected] = {
    ...markedDays[selected],
    startingDay:
      markedDays[selected]?.startingDay !== undefined
        ? markedDays[selected]?.startingDay
        : true,
    endingDay:
      markedDays[selected]?.endingDay !== undefined
        ? markedDays[selected]?.endingDay
        : true,
    selected: true,
    disableTouchEvent: false,
    color: theme.colors.CTA500,
    textColor: theme.colors.white,
  };

  return markedDays;
};
