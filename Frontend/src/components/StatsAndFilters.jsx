const StatsAndFilters = ({ tasks, search, setSearch, filter, setFilter }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const filters = [
    { key: "all", label: "Tat ca" },
    { key: "active", label: "Chua xong" },
    { key: "completed", label: "Hoan thanh" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      <div className="flex gap-4 text-sm text-slate-500">
        <span>Tong: <b className="text-slate-900">{total}</b></span>
        <span>Chua xong: <b className="text-orange-600">{active}</b></span>
        <span>Hoan thanh: <b className="text-green-600">{completed}</b></span>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tim kiem cong viec..."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1 text-sm ${
              filter === f.key
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;