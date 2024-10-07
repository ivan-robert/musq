import { useSessionsStats } from "#modules/Statistics/SessionsStats/view/useSessionsStats";
import { DateTime } from "luxon";
import { useState } from "react";

export const useSessionStatsCarousel = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const endOfMonth = DateTime.fromJSDate(new Date()).endOf("month").toJSDate();
  const monthBeginning = DateTime.fromJSDate(new Date())
    .startOf("month")
    .toJSDate();
  const previousMonthBeginning = DateTime.fromJSDate(monthBeginning)
    .minus({ months: 1 })
    .toJSDate();
  const { data: monthStats, isLoading: areMonthStatsLoading } =
    useSessionsStats(monthBeginning, endOfMonth);
  const { data: previousMonthStats, isLoading: arePreviousMonthStatsLoading } =
    useSessionsStats(previousMonthBeginning, monthBeginning);
  const isLoading = areMonthStatsLoading || arePreviousMonthStatsLoading;

  const numberOfMuscles = Object.values(
    monthStats?.muscle_repartion ?? {}
  ).filter((e) => e > 0).length;

  const previousNumber = Object.values(
    previousMonthStats?.muscle_repartion ?? {}
  ).filter((e) => e > 0).length;

  return {
    isLoading,
    pageIndex,
    dates: {
      endOfMonth,
      monthBeginning,
      previousMonthBeginning,
    },
    setPageIndex,
    stats: {
      monthStats,
      previousMonthStats,
      numberOfMuscles,
      previousNumber,
    },
  };
};
