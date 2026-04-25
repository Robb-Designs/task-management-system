import type { TaskListProps } from "../types";
import { TaskItem } from "../TaskItem/TaskItem";



function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const taskList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onStatusChange={onStatusChange}
      onDelete={onDelete}
    />
  ));

  return <div className="task-list">{taskList}</div>;
}


export default TaskList;

