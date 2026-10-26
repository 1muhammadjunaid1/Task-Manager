import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, onDelete }) {
  return (
    <section className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 && <p className="empty-state">No tasks match the selected filters.</p>}
      {tasks.length > 0 && (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
