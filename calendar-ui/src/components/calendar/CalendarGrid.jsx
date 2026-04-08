import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  subDays,
  addDays,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";

import { useState } from "react";
import WeekHeader from "./WeekHeader";

export default function CalendarGrid({ currentDate, range, setRange }) {
  const [isDragging, setIsDragging] = useState(false);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const days = eachDayOfInterval({ start, end });

  const startOffset = getDay(start) === 0 ? 6 : getDay(start) - 1;
  const endOffset = 6 - (getDay(end) === 0 ? 6 : getDay(end) - 1);

  const prevDays = [];
  for (let i = startOffset; i > 0; i--) {
    prevDays.push(subDays(start, i));
  }

  const nextDays = [];
  for (let i = 1; i <= endOffset; i++) {
    nextDays.push(addDays(end, i));
  }

  const allDays = [...prevDays, ...days, ...nextDays];

  const handleMouseDown = (day) => {
    setIsDragging(true);
    setRange({
      start: day.toISOString(),
      end: null,
    });
  };

  const handleMouseEnter = (day) => {
    if (!isDragging || !range.start) return;

    const startDate = new Date(range.start);

    if (isBefore(day, startDate)) {
      setRange({
        start: day.toISOString(),
        end: startDate.toISOString(),
      });
    } else {
      setRange({
        start: startDate.toISOString(),
        end: day.toISOString(),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isInRange = (day) => {
    if (!range.start) return false;

    const startDate = new Date(range.start);
    const endDate = new Date(range.end || range.start);

    return (
      isEqual(day, startDate) ||
      isEqual(day, endDate) ||
      (isAfter(day, startDate) && isBefore(day, endDate))
    );
  };

  return (
    <>
      <WeekHeader />

      <div
        className="grid grid-cols-7 text-sm mt-3 gap-y-3"
        onMouseLeave={() => setIsDragging(false)}
      >
        {allDays.map((day, i) => {
          const dayIndex = getDay(day);
          const isWeekend = dayIndex === 0 || dayIndex === 6;
          const isCurrentMonth =
            day.getMonth() === currentDate.getMonth();

          const selected = isInRange(day);

          return (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={handleMouseUp}
              className={`
                text-center py-2 text-[15px] cursor-pointer select-none
                transition-all duration-200 ease-in-out

                ${selected ? "bg-blue-500 text-white rounded-md scale-105 shadow-md" : ""}

                ${
                  !selected &&
                  (isCurrentMonth
                    ? isWeekend
                      ? "text-blue-500"
                      : "text-gray-800"
                    : "text-gray-300")
                }

                hover:bg-blue-100 hover:rounded-lg hover:scale-105 hover:shadow-sm
              `}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </>
  );
}