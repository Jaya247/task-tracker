import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://task-tracker-jmoa.onrender.com/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }
    if (title.trim().length > 50) {
      setError('Title must be under 50 characters.');
      return;
    }

    try {
      await axios.post(API_URL, { title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await axios.put(`${API_URL}/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <form onSubmit={handleAddTask} className="task-form">
        {error && <p className="error-text">{error}</p>}
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
        {tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.status}`}>
            <div className="task-info">
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              <span className="status-badge">{task.status}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleStatus(task)}>
                {task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
              </button>
              <button onClick={() => handleDelete(task._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;