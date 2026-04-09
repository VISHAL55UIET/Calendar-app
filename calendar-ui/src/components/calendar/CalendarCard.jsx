import { useRef } from "react";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Body from "../layout/Body";
import useCalendar from "../../hooks/useCalendar";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function CalendarCard() {
  const { currentDate, nextMonth, prevMonth } = useCalendar();
  const [range, setRange] = useLocalStorage("range", {
    start: null,
    end: null,
  });
  const lastScroll = useRef(0);
  const handleScroll = (e) => {
    const now = Date.now();
    if (now - lastScroll.current < 500) return; 
    if (e.deltaY > 0) {
      nextMonth();
    } else {
      prevMonth();
    }

    lastScroll.current = now;
  };

  return (
    <div
      onWheel={handleScroll}
      className="
        bg-white 
        rounded-xl 
        w-[470px] 
        overflow-hidden 
        relative

        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]
        hover:-translate-y-2

        transition-all duration-300 ease-in-out
      "
    >
      <Header />
      <div className="transition-all duration-500 ease-in-out">
        <Hero
          currentDate={currentDate}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />
      </div>
      <div className="transition-all duration-500 ease-in-out">
        <Body 
          currentDate={currentDate} 
          range={range} 
          setRange={setRange}   
        />
      </div>
    </div>
  );
}