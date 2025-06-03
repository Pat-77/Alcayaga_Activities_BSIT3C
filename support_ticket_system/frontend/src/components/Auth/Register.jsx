// frontend\src\components\Auth\Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../AuthDashboardLayout.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
    profile_photo: null
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profile_photo') {
      setFormData({ ...formData, profile_photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Registration successful');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="agent">Agent</option>
      </select>
      <input name="profile_photo" type="file" accept="image/*" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
