import { useMemo, useState } from "react";
import type { SortBy, Task, TaskStatus, Filters } from "./components/types";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import TaskList from "./components/TaskList/TaskList";

import "./App.css";

const Tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    status: "pending",
    priority: "medium",
    dueDate: "2026-10-31",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description for Task 2",
    status: "pending",
    priority: "low",
    dueDate: "2026-11-30",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description for Task 3",
    status: "pending",
    priority: "low",
    dueDate: "2026-09-30",
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description for Task 4",
    status: "pending",
    priority: "high",
    dueDate: "2026-05-31",
  },
];

// A mapping from task status values to their display labels.
const priorityRank: Record<"low" | "medium" | "high", number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(Tasks);
  const [filters, setFilters] = useState<Filters>({}); // Store the current filter settings (status, priority, sortBy)

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <section id="center">
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </section>
    </>
  );
}

export default App;
