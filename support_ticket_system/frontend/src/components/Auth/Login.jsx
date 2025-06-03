// frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../AuthDashboardLayout.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const fetchUserProfile = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/user/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user profile");

    return await response.json();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Step 1: Get access token
      const res = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
      const token = res.data.access;

      // Step 2: Save token and login
      login({ username: credentials.username }, token);
      localStorage.setItem('accessToken', token);

      // Step 3: Fetch user profile
      const user = await fetchUserProfile(token);
      localStorage.setItem('userRole', user.role);

      alert('Login successful!');

      // Step 4: Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
