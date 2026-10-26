import React from 'react';
import CardWrapper from './CardWrapper';

function TaskCard({ task, onDelete }) {
  const priorityClass = task.priority.toLowerCase();

  return (
    <CardWrapper>
      <div className="task-card-content"><p className="task-title">{task.title}</p><p className="task-status">{task.status}</p></div>
      <div className="task-card-actions">
        <span className={`priority-badge ${priorityClass}`}>{task.priority === 'High' ? 'High' : task.priority === 'Medium' ? 'Medium' : 'Low'}</span>
        <button className="delete-button" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>×</button>
      </div>
    </CardWrapper>
  );
}

export default TaskCard;
