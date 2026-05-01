import type { TaskItemProps, TaskStatus } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// A mapping from task status values to their display labels.
//this will be used to show a more user-friendly label for the task status in the UI, instead of showing the raw status value.
const StatusLabel: Record<TaskStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  // Determine if the task is overdue by comparing the current date with the task's due date, but only if the task is not completed.
  const isOverdue =
    task.status !== "completed" && new Date(task.dueDate) < new Date();

  return (
    <Card className={`task-item task-item--${task.status}`}>
      <CardHeader>
        <CardTitle
          className={
            task.status === "completed"
              ? "line-through text-muted-foreground"
              : ""
          }
        >
          {task.title}
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Status: {StatusLabel[task.status]}</p>
        {/* Show the priority badge with a class that reflects the priority level (e.g., low, medium, high). */}
        <Badge variant="outline">{task.priority}</Badge>
        <p className={isOverdue ? "text-destructive font-semibold" : ""}>
          {isOverdue ? "Overdue: " : "Due Date: "}
          {task.dueDate}
        </p>
      </CardContent>

      <CardFooter>
        <Select
          value={task.status}
          onValueChange={(value) =>
            onStatusChange(task.id, value as TaskStatus)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="destructive" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
