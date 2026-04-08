import CalendarCard from "./components/calendar/CalendarCard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      {/* TOAST */}
      <Toaster position="top-center" />

      {/* MAIN UI */}
      <div
        className="
          min-h-screen 
          flex items-center justify-center
          bg-gradient-to-br 
          from-slate-100 
          via-blue-50 
          to-slate-200
        "
      >
        <CalendarCard />
      </div>
    </>
  );
}