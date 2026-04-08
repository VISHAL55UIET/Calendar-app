import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

export function getMonthDays(date) {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
}

export function getStartDayOffset(date) {
  const day = getDay(startOfMonth(date));
  return day === 0 ? 6 : day - 1;
}