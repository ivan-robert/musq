import { DateTime } from "luxon";

export function timestampzToDate(timestampz: string): Date {
  return new Date(timestampz);
}

export function dateToTimestampz(date: Date): string {
  return date.toISOString();
}

export function dateToDateString(date: Date): string {
  return DateTime.fromJSDate(date).toFormat("dd-MM-yyyy");
}

export function dateStringToDate(dateString: string): Date {
  return new Date(dateString);
}
