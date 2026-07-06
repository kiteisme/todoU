import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onAddTask(title.trim(), dueDate || null);
      setTitle("");
      setDueDate("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Ban can lam gi hom nay?"
          className="h-12 flex-1 rounded-xl border-slate-200 bg-slate-50"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-12 w-full rounded-xl border-slate-200 bg-slate-50 sm:w-44"
        />
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="h-12 rounded-xl bg-slate-900 px-6 hover:bg-slate-800"
        >
          <Plus className="mr-2 h-5 w-5" />
          {submitting ? "Dang them..." : "Them viec"}
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;