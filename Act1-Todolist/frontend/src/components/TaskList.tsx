import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  filter: 'all' | 'active' | 'completed';
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  filter 
}) => {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    const getEmptyMessage = () => {
      switch (filter) {
        case 'active':
          return 'No active tasks! 🎉';
        case 'completed':
          return 'No completed tasks yet.';
        default:
          return 'No tasks yet. Add your first task!';
      }
    };

    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>{getEmptyMessage()}</h3>
        <p>
          {filter === 'all' 
            ? 'Click "Add Task" to get started.' 
            : `Switch to "All" to see ${filter === 'active' ? 'completed' : 'active'} tasks.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
