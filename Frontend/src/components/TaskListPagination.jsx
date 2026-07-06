
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskListPagination = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" disabled>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button className="bg-slate-900 hover:bg-slate-800">
        1
      </Button>

      <Button variant="outline" size="icon" disabled>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskListPagination;

