import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { getAllTasks, createTask, updateTask, deleteTask } from "@/api/taskApi";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title, dueDate) => {
    await createTask(title, dueDate);
    await loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggleTask = async (id, currentCompleted) => {
    await updateTask(id, { completed: !currentCompleted });
    await loadTasks();
  };

  const handleEditTask = async (id, currentTitle) => {
    const newTitle = prompt("Sua ten task", currentTitle);
    if (!newTitle || !newTitle.trim()) return;
    await updateTask(id, { title: newTitle.trim() });
    await loadTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true : filter === "active" ? !task.completed : task.completed;
    const matchDate = dateFilter
      ? task.dueDate && task.dueDate.slice(0, 10) === dateFilter
      : true;
    return matchSearch && matchFilter && matchDate;
  });

  return (
    <div className="relative min-h-screen bg-slate-100">
      <div className="container mx-auto max-w-4xl px-4 py-10">
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
          <DateTimeFilter value={dateFilter} onChange={setDateFilter} />

          {loading && <p className="text-center text-slate-500">Dang tai...</p>}
          {error && <p className="text-center text-red-500">Loi: {error}</p>}

          {!loading && !error && (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
            />
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;