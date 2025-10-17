import React, { useState, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto } from './types/Task';
import { taskService } from './services/taskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: CreateTaskDto) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (taskData: UpdateTaskDto) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleFormSubmit = (taskData: CreateTaskDto | UpdateTaskDto) => {
    if (editingTask) {
      handleUpdateTask(taskData as UpdateTaskDto);
    } else {
      handleAddTask(taskData as CreateTaskDto);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const updatedTask = await taskService.toggleTaskComplete(id);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      <main className="app-main">
        <div className="task-controls">
          <button 
            onClick={() => setShowForm(true)} 
            className="add-task-btn"
            disabled={showForm || editingTask !== null}
          >
            + Add Task
          </button>

          <div className="task-stats">
            <span className="stat">Total: {stats.total}</span>
            <span className="stat">Active: {stats.active}</span>
            <span className="stat">Completed: {stats.completed}</span>
          </div>
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({stats.active})
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          filter={filter}
        />

        {showForm && (
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            isEditing={false}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            isEditing={true}
          />
        )}
      </main>
    </div>
  );
}

export default App;
