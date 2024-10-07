import { DateTime } from "luxon";

export type TimeFrame = "week" | "month" | "year";

export const computeTimeFrame = (timeFrame: TimeFrame, initialDate: Date) => {
  if (timeFrame === "week") {
    const endDate = new Date(initialDate);
    endDate.setDate(endDate.getDate() - 7);
    return {
      startDate: endDate,
      endDate: initialDate,
    };
  }
  if (timeFrame === "month") {
    const endDate = new Date(initialDate);
    endDate.setMonth(endDate.getMonth() - 1);
    return {
      startDate: endDate,
      endDate: initialDate,
    };
  }
  if (timeFrame === "year") {
    const endDate = DateTime.fromJSDate(initialDate)
      .minus({ years: 1 })
      .toJSDate();
    return {
      startDate: endDate,
      endDate: initialDate,
    };
  }
  throw new Error("Invalid timeFrame");
};
