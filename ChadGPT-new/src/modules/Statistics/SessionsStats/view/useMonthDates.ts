import { DateTime } from "luxon";

export const useMonthDates = () => {
  const referenceDateTime = DateTime.now();
  const startOfMonth = referenceDateTime.startOf("month").toJSDate();
  const endOfMonth = referenceDateTime.endOf("month").toJSDate();
  return { startOfMonth, endOfMonth };
};
