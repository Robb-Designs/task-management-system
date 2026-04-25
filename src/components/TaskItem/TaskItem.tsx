import type { TaskItemProps, TaskStatus } from "../types";

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p>
      <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

