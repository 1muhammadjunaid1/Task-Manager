import React, { useState } from 'react';
import CardWrapper from './CardWrapper';

function TaskCard({ task, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const priorityClass = task.priority.toLowerCase();

  return (
    <>
      <CardWrapper>
        <div className="task-card-content"><p className="task-title">{task.title}</p><p className="task-status">{task.status}</p></div>
        <div className="task-card-actions">
          <span className={`priority-badge ${priorityClass}`}>{task.priority === 'High' ? 'High' : task.priority === 'Medium' ? 'Medium' : 'Low'}</span>
          <button className="delete-button" type="button" aria-label={`Delete ${task.title}`} onClick={() => setShowConfirm(true)}>×</button>
        </div>
      </CardWrapper>

      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-title">Delete task</p>
            <p className="confirm-message">Are you sure you want to delete "<strong>{task.title}</strong>"?</p>
            <div className="confirm-actions">
              <button className="confirm-cancel" type="button" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm-delete" type="button" onClick={() => { setShowConfirm(false); onDelete(task.id); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
