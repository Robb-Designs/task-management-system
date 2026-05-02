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

	const [sortBy, setSortBy] = useState<"" | "dueDate" | "priority" | "title">("");

	// Send the latest filter values to the parent component.
	const emitFilters = (nextCategory: "" | TaskStatus, nextPriority: "" | TaskPriority, nextSortBy: "" | "dueDate" | "priority" | "title") => {
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
		<div className="task-filter">
			{/* Category/status dropdown */}
			<label htmlFor="category-filter">Category</label>
			<select
				id="category-filter"
				value={category}
				onChange={(event) => handleCategoryChange(event.target.value as "" | TaskStatus)}
			>
				<option value="">All categories</option>
				<option value="pending">Pending</option>
				<option value="in-progress">In Progress</option>
				<option value="completed">Completed</option>
			</select>

			{/* Priority dropdown */}
			<label htmlFor="priority-filter">Priority</label>
			<select
				id="priority-filter"
				value={priority}
				onChange={(event) => handlePriorityChange(event.target.value as "" | TaskPriority)}
			>
				<option value="">All priorities</option>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>

			{/* Sort dropdown */}
<label htmlFor="sort-filter">Sort By</label>
<select
    id="sort-filter"
    value={sortBy}
    onChange={e => {
        setSortBy(e.target.value as '' | 'dueDate' | 'priority' | 'title');
        emitFilters(category, priority, e.target.value as '' | 'dueDate' | 'priority' | 'title');
    }}
>
    <option value="">Default</option>
    <option value="dueDate">Due Date</option>
    <option value="priority">Priority</option>
    <option value="title">Title</option>
</select>


			{/* Button to clear all selected filters */}
			<button type="button" onClick={clearFilters}>
				Clear filters
			</button>
		</div>
	);
}

export default TaskFilter;
