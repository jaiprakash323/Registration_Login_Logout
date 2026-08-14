import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await api.post('/tasks/', taskData);
      fetchTasks();
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data || err);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      await api.put(`/tasks/${id}/`, taskData);
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      fetchTasks();
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='dashboard-layout'>
      <header className='navbar'>
        <div className='nav-brand'>
          <h1>Task Manager</h1>
        </div>
        <div className='nav-user-section'>
          {user && (
            <div className='user-badge'>
              <span>👤 {user.username}</span>
              {user.role && <span className='role-pill'>{user.role}</span>}
            </div>
          )}
          <button className='btn-logout' type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className='dashboard-content'>
        <TaskForm
          onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />
        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default Dashboard;