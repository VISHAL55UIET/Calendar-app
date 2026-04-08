import NotesPanel from "../notes/NotesPanel";
import CalendarGrid from "../calendar/CalendarGrid";
export default function Body({ currentDate, range, setRange }) {
  return (
    <div className="grid grid-cols-2 gap-6 p-5">
      
      <div>
        <NotesPanel range={range} />
      </div>

      <div>
        <CalendarGrid 
          currentDate={currentDate}
          range={range}
          setRange={setRange}
        />
      </div>

    </div>
  );
}