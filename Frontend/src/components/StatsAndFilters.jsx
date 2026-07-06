
import { Search, ListTodo, Circle, CircleCheckBig } from "lucide-react";

const StatsAndFilters = ({
  tasks,
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  const filters = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "active",
      label: "Chưa xong",
    },
    {
      key: "completed",
      label: "Hoàn thành",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Statistics */}

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-100 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-slate-700" />
            <span className="text-sm text-slate-500">
              Tổng công việc
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {total}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Circle className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-orange-600">
              Chưa hoàn thành
            </span>
          </div>

          <p className="text-2xl font-bold text-orange-600">
            {active}
          </p>
        </div>

        <div className="rounded-2xl bg-green-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CircleCheckBig className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-600">
              Hoàn thành
            </span>
          </div>

          <p className="text-2xl font-bold text-green-600">
            {completed}
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-5">

        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm công việc..."
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 outline-none transition focus:border-slate-900"
        />

      </div>

      {/* Filter */}

      <div className="flex flex-wrap gap-3">

        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === item.key
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

    </div>
  );
};

export default StatsAndFilters;

