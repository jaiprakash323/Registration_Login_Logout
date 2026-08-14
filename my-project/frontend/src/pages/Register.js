import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatErrorMessages = (data) => {
    if (!data) return 'Registration failed. Please try again.';
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.error) return data.error;

    const messages = [];
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
      if (Array.isArray(value)) {
        messages.push(`${fieldName}: ${value.join(' ')}`);
      } else if (typeof value === 'string') {
        messages.push(`${fieldName}: ${value}`);
      }
    });

    return messages.length > 0 ? messages.join(' | ') : 'Registration failed. Please check your inputs.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.password2) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await api.post('/register/', form);
      navigate('/login');
    } catch (error) {
      if (error.response?.data) {
        console.error('Registration backend error:', error.response.data);
        setError(formatErrorMessages(error.response.data));
      } else {
        console.error('Registration network error:', error);
        setError('Network error. Is the server running?');
      }
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-card'>
        <div className='auth-header'>
          <h2>Create Account</h2>
          <p>Join us by creating your new account</p>
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
            name="email"
            placeholder="Email Address"
            type="email"
            value={form.email}
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
          <input
            className='input-field'
            name="password2"
            placeholder="Confirm Password"
            type="password"
            value={form.password2}
            onChange={handleChange}
            required
          />
          <button className='btn-primary' type="submit">Create Account</button>
        </form>
        <div className='auth-footer'>
          Already have an account?{' '}
          <button type="button" onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Register;