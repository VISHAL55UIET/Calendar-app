import { useEffect, useState } from "react";
import { format } from "date-fns";

import jan from "../../images/months/jan.jpg";
import feb from "../../images/months/feb.jpg";
import mar from "../../images/months/mar.jpg";
import apr from "../../images/months/apr.jpg";
import may from "../../images/months/may.jpg";
import jun from "../../images/months/jun.jpg";
import jul from "../../images/months/jul.jpg";
import aug from "../../images/months/aug.jpg";
import sep from "../../images/months/sep.jpg";
import oct from "../../images/months/oct.jpg";
import nov from "../../images/months/nov.jpg";
import dec from "../../images/months/dec.jpg";

const monthImages = [
  jan, feb, mar, apr, may, jun,
  jul, aug, sep, oct, nov, dec
];

export default function Hero({ currentDate, nextMonth, prevMonth }) {
  const [currentImage, setCurrentImage] = useState(
    monthImages[currentDate.getMonth()]
  );
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false); // fade out

    const timeout = setTimeout(() => {
      setCurrentImage(monthImages[currentDate.getMonth()]);
      setFade(true); 
    }, 200); 

    return () => clearTimeout(timeout);
  }, [currentDate]);
   
  return (
    <div className="relative h-72 overflow-hidden rounded-t-xl">
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      <img
        src={currentImage}
        alt="hero"
        className={`
          w-full h-full object-cover
          transition-opacity duration-500 ease-in-out
          ${fade ? "opacity-100" : "opacity-0"}
        `}
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center text-white">
        <button
          onClick={prevMonth}
          className="bg-white/20 backdrop-blur px-3 py-1 rounded hover:bg-white/30 transition"
        >
          ←
        </button>

        <h2 className="text-sm font-semibold text-white drop-shadow-md">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={nextMonth}
          className="bg-white/20 backdrop-blur px-3 py-1 rounded hover:bg-white/30 transition"
        >
          →
        </button>
      </div>

      <div className="absolute bottom-6 right-6 text-white text-right">
        <p className="text-sm">{format(currentDate, "yyyy")}</p>
        <h2 className="text-2xl font-bold drop-shadow-lg">
          {format(currentDate, "MMMM")}
        </h2>
      </div>
    </div>
  );
}