import { useState } from "react";

export default function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const selectDate = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isInRange = (date) =>
    startDate && endDate && date >= startDate && date <= endDate;

  return {
    startDate,
    endDate,
    selectDate,
    isInRange,
  };
}