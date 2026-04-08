import { getDay } from "date-fns";

export default function DayCell({ day }) {
  const dayIndex = getDay(day);

  const isSaturday = dayIndex === 6;
  const isSunday = dayIndex === 0;

  return (
    <div
      className={`
        text-center p-2 text-sm
        ${isSaturday || isSunday ? "text-blue-500 font-medium" : "text-gray-800"}
      `}
    >
      {day.getDate()}
    </div>
  );
}