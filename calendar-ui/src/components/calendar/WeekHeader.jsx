export default function WeekHeader() {
  const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

  return (
    <div className="grid grid-cols-7 text-[10px] mb-2">
      {days.map((d, i) => (
        <div
          key={d}
          className={`text-center 
            ${i === 5 || i === 6 
              ? "text-blue-500 font-semibold" 
              : "text-gray-500"}`}
        >
          {d}
        </div>
      ))}
    </div>
  );
}