
import React from "react";
import { CalendarDays, X } from "lucide-react";

const DateTimeFilter = ({ value, onChange }) => {
  const options = [
    {
      value: "",
      label: "Tất cả thời gian",
    },
    {
      value: "day",
      label: "Hôm nay",
    },
    {
      value: "week",
      label: "Tuần này",
    },
    {
      value: "month",
      label: "Tháng này",
    },
    {
      value: "year",
      label: "Năm nay",
    },
  ];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

      <CalendarDays className="h-5 w-5 text-slate-500" />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 cursor-pointer bg-transparent text-sm font-medium text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {value && (
        <button
          onClick={() => onChange("")}
          className="rounded-full p-1 transition hover:bg-slate-100"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>
      )}

    </div>
  );
};

export default DateTimeFilter;

