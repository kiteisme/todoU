import { CalendarDays, X } from "lucide-react";

const DateTimeFilter = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <CalendarDays className="h-5 w-5 text-slate-500" />
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none bg-transparent text-slate-700 outline-none"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-slate-400 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default DateTimeFilter;