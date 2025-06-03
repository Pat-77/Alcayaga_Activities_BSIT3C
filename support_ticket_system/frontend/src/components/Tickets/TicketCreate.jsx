// src/components/Tickets/TicketCreate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tickets.css';
import { useAuth } from '../../contexts/AuthContext'; // ✅ Import the context

function TicketCreate() {
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const [categories, setCategories] = useState([]);
  const { token } = useAuth(); // ✅ Get the token

  useEffect(() => {
    const fetchCategories = async () => {
      console.log('Token:', token); // ✅ Log the token
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/categories/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Fetched categories:', res.data); // ✅ Log fetched categories
        setCategories(res.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        alert('You must be logged in to create a ticket.');
      }
    };

    if (token) fetchCategories(); // ✅ Only fetch if token is available
  }, [token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tickets/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Ticket created!');
    } catch (error) {
      console.error('Failed to create ticket:', error);
      alert('Error creating ticket.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
}

export default TicketCreate;
