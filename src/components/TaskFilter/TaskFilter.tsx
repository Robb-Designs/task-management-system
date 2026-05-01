import { useState } from "react";
import type { TaskFilterProps, TaskStatus } from "../types";

// Reuse the same priority options used in the task type from index.ts.
type TaskPriority = "low" | "medium" | "high";

function TaskFilter({ onFilterChange }: TaskFilterProps) {
	// Store the selected category (status). Empty string means "show all".
	const [category, setCategory] = useState<"" | TaskStatus>("");
	// Store the selected priority. Empty string means "show all".
	const [priority, setPriority] = useState<"" | TaskPriority>("");

	// Send the latest filter values to the parent component.
	const emitFilters = (nextCategory: "" | TaskStatus, nextPriority: "" | TaskPriority) => {
		onFilterChange({
			...(nextCategory ? { status: nextCategory } : {}),
			...(nextPriority ? { priority: nextPriority } : {}),
		});
	};

	// Update category and apply new filter set.
	const handleCategoryChange = (value: "" | TaskStatus) => {
		setCategory(value);
		emitFilters(value, priority);
	};

	// Update priority 
	const handlePriorityChange = (value: "" | TaskPriority) => {
		setPriority(value);
		emitFilters(category, value);
	};

	// Resets both dropdowns and remove all filters.
	const clearFilters = () => {
		setCategory("");
		setPriority("");
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

			{/* Button to clear all selected filters */}
			<button type="button" onClick={clearFilters}>
				Clear filters
			</button>
		</div>
	);
}

export default TaskFilter;
