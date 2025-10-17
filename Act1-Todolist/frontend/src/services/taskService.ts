import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Get single task
  async getTask(id: number): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  // Update task
  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, task);
    return response.data;
  },

  // Toggle task completion
  async toggleTaskComplete(id: number): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Delete task
  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
