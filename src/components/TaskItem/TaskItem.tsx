import type { TaskItemProps, TaskStatus } from "../types";

// A mapping from task status values to their display labels.
//this will be used to show a more user-friendly label for the task status in the UI, instead of showing the raw status value.
const StatusLabel: Record<TaskStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  const isOverdue =
    task.status !== "completed" && new Date(task.dueDate) < new Date();

  return (
    <div className={`task-item task-item--${task.status}`}>
      <div className="task-item">
        {/* Show an "Overdue" badge if the task is overdue and not completed. */}
        <h3 className={task.status === "completed" ? "task-item-title-completed" : "task-item-title"}>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        {/* Show the priority badge with a class that reflects the priority level (e.g., low, medium, high). */}
        <span className={`task-item__priority-badge task-item__priority-badge--${task.priority}`}>
          {task.priority}
        </span>
        <p>Due Date: {task.dueDate}</p>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
