import React, { useEffect, useRef, useState } from 'react';

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('Pending');
  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      titleInputRef.current.focus();
      return;
    }
    onSubmit({ title: title.trim(), priority, status });
    setTitle('');
    titleInputRef.current.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label><span className="sr-only">Task title</span><input ref={titleInputRef} type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" /></label>
      <label><span className="sr-only">Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></label>
      <label><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Pending</option><option>Active</option><option>Completed</option></select></label>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
