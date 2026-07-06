
import React, { useEffect, useMemo, useState } from "react";

import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/api/taskApi";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // ============================
  // Load Tasks
  // ============================

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getAllTasks();

      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ============================
  // CRUD
  // ============================

  const handleAddTask = async (title, dueDate) => {
    await createTask(title, dueDate);
    await loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggleTask = async (id, completed) => {
    await updateTask(id, {
      completed: !completed,
    });

    await loadTasks();
  };

  const handleEditTask = async (id, currentTitle) => {
    const newTitle = prompt("Sửa tên công việc", currentTitle);

    if (!newTitle || !newTitle.trim()) return;

    await updateTask(id, {
      title: newTitle.trim(),
    });

    await loadTasks();
  };

  // ============================
  // Filter
  // ============================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        filter === "all"
          ? true
          : filter === "active"
          ? !task.completed
          : task.completed;

      let matchDate = true;

      if (dateFilter && task.dueDate) {
        const now = new Date();
        const dueDate = new Date(task.dueDate);

        switch (dateFilter) {
          case "day":
            matchDate =
              dueDate.toDateString() ===
              now.toDateString();
            break;

          case "week": {
            const firstDay = new Date(now);

            firstDay.setHours(0, 0, 0, 0);
            firstDay.setDate(
              now.getDate() - now.getDay()
            );

            const lastDay = new Date(firstDay);

            lastDay.setDate(firstDay.getDate() + 6);
            lastDay.setHours(23, 59, 59, 999);

            matchDate =
              dueDate >= firstDay &&
              dueDate <= lastDay;

            break;
          }

          case "month":
            matchDate =
              dueDate.getMonth() ===
                now.getMonth() &&
              dueDate.getFullYear() ===
                now.getFullYear();
            break;

          case "year":
            matchDate =
              dueDate.getFullYear() ===
              now.getFullYear();
            break;

          default:
            matchDate = true;
        }
      }

      return (
        matchSearch &&
        matchStatus &&
        matchDate
      );
    });
  }, [tasks, search, filter, dateFilter]);

  // ============================
  // Pagination
  // ============================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  );

  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, dateFilter]);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="container mx-auto max-w-5xl px-4 py-10">

        <div className="space-y-6">

          <Header />

          <AddTask onAddTask={handleAddTask} />

          <StatsAndFilters
            tasks={tasks}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {loading && (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl bg-red-100 p-4 text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <TaskList
                tasks={currentTasks}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
              />

              <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">

                <TaskListPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />

                <DateTimeFilter
                  value={dateFilter}
                  onChange={setDateFilter}
                />

              </div>
            </>
          )}

          <Footer />

        </div>

      </div>

    </div>
  );
};

export default Homepage;

