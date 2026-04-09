import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };
  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  return { currentDate, nextMonth, prevMonth };
}