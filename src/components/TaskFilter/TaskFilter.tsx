import { useState } from "react";
import type { TaskFilterProps, TaskStatus } from "../types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Reuse the same priority options used in the task type from index.ts.
type TaskPriority = "low" | "medium" | "high";

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  // Store the selected category (status). Empty string means "show all".
  const [category, setCategory] = useState<"" | TaskStatus>("");
  // Store the selected priority. Empty string means "show all".
  const [priority, setPriority] = useState<"" | TaskPriority>("");

  const [sortBy, setSortBy] = useState<"" | "dueDate" | "priority" | "title">(
    "",
  );

  // Send the latest filter values to the parent component.
  const emitFilters = (
    nextCategory: "" | TaskStatus,
    nextPriority: "" | TaskPriority,
    nextSortBy: "" | "dueDate" | "priority" | "title",
  ) => {
    onFilterChange({
      //these lines below only include the filter in the emitted object if it has a value (not an empty string)
      ...(nextCategory ? { status: nextCategory } : {}),
      ...(nextPriority ? { priority: nextPriority } : {}),
      ...(nextSortBy ? { sortBy: nextSortBy } : {}),
    });
  };

  // Update category and apply new filter set.
  const handleCategoryChange = (value: "" | TaskStatus) => {
    setCategory(value);
    emitFilters(value, priority, sortBy);
  };

  // Update priority
  const handlePriorityChange = (value: "" | TaskPriority) => {
    setPriority(value);
    emitFilters(category, value, sortBy);
  };

  // Resets both dropdowns and remove all filters.
  const clearFilters = () => {
    setCategory("");
    setPriority("");
    setSortBy("");
    onFilterChange({});
  };

  return (
    <div className="task-filter flex flex-col gap-4 md:flex-row md:items-center">
      {/* Category/status dropdown */}
      <label htmlFor="category-filter">Category</label>
      <Select
        value={category}
        onValueChange={(value: string) =>
          handleCategoryChange(value as "" | TaskStatus)
        }
      >
        <SelectTrigger id="category-filter">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All categories</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority dropdown */}
      <label htmlFor="priority-filter">Priority</label>
      <Select
        value={priority}
        onValueChange={(value: string) =>
          handlePriorityChange(value as "" | TaskPriority)
        }
      >
        <SelectTrigger id="priority-filter">
          <SelectValue placeholder="All priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort dropdown */}
      <label htmlFor="sort-filter">Sort By</label>
      <Select
        value={sortBy}
        onValueChange={(value: string) => {
          setSortBy(value as "" | "dueDate" | "priority" | "title");
          emitFilters(
            category,
            priority,
            value as "" | "dueDate" | "priority" | "title",
          );
        }}
      >
        <SelectTrigger id="sort-filter">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Default</SelectItem>
          <SelectItem value="dueDate">Due Date</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>

      {/* Button to clear all selected filters */}
      <button variant="outline" onClick={clearFilters}>
        Clear filters
      </button>
    </div>
  );
}

export default TaskFilter;
