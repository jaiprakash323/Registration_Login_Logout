import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/login/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data) {
        console.error(error.response.data);
        const data = error.response.data;
        setError(data.error || data.detail || 'Invalid username or password.');
      } else {
        setError('Network error. Is the server running?');
      }
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-card'>
        <div className='auth-header'>
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to sign in</p>
        </div>
        {error && <div className='error-message'>{error}</div>}
        <form className='form-group' onSubmit={handleSubmit}>
          <input
            className='input-field'
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className='input-field'
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className='btn-primary' type="submit">Sign In</button>
        </form>
        <div className='auth-footer'>
          Don't have an account?{' '}
          <button type="button" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;