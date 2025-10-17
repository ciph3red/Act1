import React from 'react';
import { Task } from '../types/Task';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return null;
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-title-section">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="task-checkbox"
            />
            <h3 className={`task-title ${task.completed ? 'completed-text' : ''}`}>
              {task.title}
            </h3>
            {task.priority && (
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
            )}
          </div>
          <div className="task-actions">
            <button 
              onClick={() => onEdit(task)}
              className="edit-btn"
              title="Edit Task"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="delete-btn"
              title="Delete Task"
            >
              🗑️
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className={`task-description ${task.completed ? 'completed-text' : ''}`}>
            {task.description}
          </p>
        )}
        
        <div className="task-meta">
          {task.dueDate && (
            <span className="due-date">
              📅 Due: {formatDate(task.dueDate)}
            </span>
          )}
          <span className="created-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
