import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2, CalendarDays } from "lucide-react";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <Card className="rounded-3xl border border-dashed border-slate-300 p-10 text-center">
        <h2 className="text-lg font-semibold text-slate-600">Chua co cong viec nao</h2>
        <p className="mt-2 text-slate-400">Them 1 cong viec de bat dau.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task._id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task._id, task.completed)}
                className="h-5 w-5 accent-slate-900"
              />
              <div>
                <h2
                  className={`text-lg font-medium ${
                    task.completed ? "text-slate-400 line-through" : "text-slate-900"
                  }`}
                >
                  {task.title}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <CalendarDays size={15} />
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("vi-VN")
                    : new Date(task.createdAt).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => onEdit(task._id, task.title)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => onDelete(task._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;