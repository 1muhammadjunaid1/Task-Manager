import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ActivityLogger from './components/class/ActivityLogger';
import TaskForm from './components/functional/TaskForm';
import TaskList from './components/functional/TaskList';
import { ThemeContext } from './context/ThemeContext';
import useTaskFilters from './hooks/useTaskFilters';

const initialTasks = [
  { id: 1, title: 'Finish lab report', priority: 'High', status: 'Pending' },
  { id: 2, title: 'Review React hooks notes', priority: 'Low', status: 'Active' },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'light' ? '☾' : '☀'}</button>;
}

function Header() {
  return <header className="app-header"><span className="app-title">Task dashboard</span><ThemeToggle /></header>;
}

function App() {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [lastAction, setLastAction] = useState('');
  const [filters, setFilters] = useTaskFilters();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const activeCount = tasks.filter((task) => task.status === 'Active').length;
    const pendingCount = tasks.filter((task) => task.status === 'Pending').length;
    document.title = `Tasks: ${activeCount} active, ${pendingCount} pending`;
  }, [tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => (
    (filters.status === 'All' || task.status === filters.status) &&
    (filters.priority === 'All' || task.priority === filters.priority)
  )), [tasks, filters]);

  const addTask = useCallback((taskData) => {
    setTasks((currentTasks) => [...currentTasks, { ...taskData, id: Date.now() }]);
    setLastAction(`Added "${taskData.title}"`);
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((currentTasks) => {
      const task = currentTasks.find((item) => item.id === taskId);
      setLastAction(`Deleted "${task ? task.title : 'task'}"`);
      return currentTasks.filter((item) => item.id !== taskId);
    });
  }, []);

  const filterTasks = useCallback((name, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
    setLastAction(`Filtered by ${name}: ${value}`);
  }, [setFilters]);

  return (
    <div className="app-shell" data-theme={theme}>
      <Header />
      <main>
        <TaskForm onSubmit={addTask} />
        <section className="filters" aria-label="Task filters">
          <span>Filter</span>
          <select value={filters.status} onChange={(event) => filterTasks('status', event.target.value)}><option>All</option><option>Pending</option><option>Active</option><option>Completed</option></select>
          <select value={filters.priority} onChange={(event) => filterTasks('priority', event.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select>
        </section>
        <TaskList tasks={filteredTasks} onDelete={deleteTask} />
        <ActivityLogger lastAction={lastAction} />
      </main>
    </div>
  );
}

export default App;
