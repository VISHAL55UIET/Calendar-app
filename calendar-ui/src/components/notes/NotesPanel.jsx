import useLocalStorage from "../../hooks/useLocalStorage";
import toast from "react-hot-toast";

export default function NotesPanel({ range }) {
  const [notesList, setNotesList] = useLocalStorage("rangeNotes", []);
  const [input, setInput] = useLocalStorage("tempNote", "");

  // ✅ FIX: support single date OR range
  const currentNote = notesList.find(
    (n) =>
      n.start === range.start &&
      n.end === (range.end || range.start)
  );

  const displayValue = currentNote ? currentNote.note : input;

  const handleSave = () => {
    // ❌ no date
    if (!range.start) {
      toast.error("Select a date ❗");
      return;
    }

    // ❌ empty note
    if (!input.trim()) {
      toast.error("Note cannot be empty ✍️");
      return;
    }

    // ✅ auto fix end date
    const startDate = range.start;
    const endDate = range.end || range.start;

    const newNote = {
      start: startDate,
      end: endDate,
      note: input,
    };

    const filtered = notesList.filter(
      (n) => !(n.start === startDate && n.end === endDate)
    );

    setNotesList([...filtered, newNote]);
    setInput("");

    toast.success("Note saved ");
  };

  return (
    <div className="relative h-full">
      <p className="text-sm font-semibold mb-2">Notes</p>

      {/* TEXTAREA */}
      <textarea
        value={displayValue || ""}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write notes for selected date/range..."
        className="w-full h-[160px] text-sm outline-none resize-none bg-transparent relative z-10"
      />

      {/* NOTEBOOK LINES */}
      <div className="absolute top-7 left-0 right-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-b border-gray-300 h-5 mb-2" />
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          disabled={!range.start}
          className={`
            px-4 py-1.5
            text-white text-sm font-medium
            rounded-full
            shadow-md
            transition-all duration-200

            ${
              range.start
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 hover:shadow-lg active:scale-95"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
        Save Note
        </button>
      </div>
    </div>
  );
}