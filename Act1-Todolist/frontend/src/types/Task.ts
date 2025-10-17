export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: string;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: string;
  dueDate?: string;
}
