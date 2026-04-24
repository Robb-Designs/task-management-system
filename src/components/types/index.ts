// TYPES FOR COMPONENTS--------------------------------------------------------------------------------------


export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

// Task List Component Types-------------------------------------------------------------------------------------
// manages and displays a list of tasks
export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}


// Task Item Component Types-------------------------------------------------------------------------------------
// displays individual task information
export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}


// Task Filter Component Types-----------------------------------------------------------------------------------
// allows filtering tasks by status and priority.
export interface TaskFilterProps {
    onFilterChange: (filters: {
        status?: TaskStatus;
        priority?: 'low' | 'medium' | 'high';
    }) => void;
};
