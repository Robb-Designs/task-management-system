// TYPES FOR COMPONENTS--------------------------------------------------------------------------------------

// TaskStatus represents the current state of a task, which can be 'pending', 'in-progress', or 'completed'.
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// sortBy represents the criteria by which tasks can be sorted, such as by due date, priority, or title.
export type SortBy = 'dueDate' | 'priority' | 'title';

// Filters represents the possible filters that can be applied to the task list, including status, priority, and sorting criteria.
export type Filters = {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    sortBy?: SortBy;
};



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
        sortBy?: SortBy;
    }) => void;
};
