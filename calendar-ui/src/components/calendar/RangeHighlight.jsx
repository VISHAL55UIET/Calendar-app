import { isSameDay } from "date-fns";

export default function RangeHighlight({
  day,
  startDate,
  endDate,
  isInRange,
  children,
  onClick,
}) {
  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);
  const inRange = isInRange(day);

  return (
    <div
      onClick={() => onClick(day)}
      className={`
        relative flex items-center justify-center
        cursor-pointer transition-all duration-200
        h-8 w-8 rounded-md

        hover:bg-blue-100

        ${isStart || isEnd ? "bg-blue-600 text-white" : ""}
        ${inRange ? "bg-blue-200" : ""}
      `}
    >
      {children}
    </div>
  );
}