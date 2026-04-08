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
  isSameDay
} from "date-fns";

import { useState } from "react";
import WeekHeader from "./WeekHeader";

export default function CalendarGrid({ currentDate, range, setRange }) {
  const [isDragging, setIsDragging] = useState(false);

  // ✅ YEAR-INDEPENDENT HOLIDAYS
  const holidays = {
    "01-01": "New Year",
    "01-14": "Makar Sankranti",
    "01-26": "Republic Day",
    "03-08": "Holi",
    "03-30": "Ram Navami",
    "04-14": "Ambedkar Jayanti",
    "05-01": "Labour Day",
    "06-17": "Eid al-Adha",
    "08-15": "Independence Day",
    "08-28": "Raksha Bandhan",
    "09-05": "Teacher's Day",
    "10-02": "Gandhi Jayanti",
    "10-20": "Diwali",
    "11-01": "Karnataka Rajyotsava",
    "12-25": "Christmas"
  };

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
          const isToday = isSameDay(day, new Date());

          // ✅ MONTH-DAY KEY (YEAR INDEPENDENT)
          const dateKey = `${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

          const isHoliday = holidays[dateKey];

          return (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={handleMouseUp}
              title={isHoliday || ""}
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

                ${
                  isToday && !selected
                    ? "ring-2 ring-blue-400 font-semibold rounded-md bg-blue-50"
                    : ""
                }

                ${
                  isHoliday && !selected
                    ? "text-red-500 font-semibold"
                    : ""
                }

                hover:bg-blue-100 hover:rounded-lg hover:scale-105 hover:shadow-sm
              `}
            >
              {/* 🔥 CLEAN HOLIDAY DOT */}
              <div className="relative inline-block">
                {day.getDate()}

                {isHoliday && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-sm"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}