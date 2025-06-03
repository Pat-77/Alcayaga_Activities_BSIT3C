import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import './Tickets.css';

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachment, setAttachment] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/tickets/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onTicketCreated && onTicketCreated(res.data);
      setTitle('');
      setDescription('');
      setCategory('');
      setAttachment(null);
      alert("Ticket created successfully!");
    } catch (error) {
      console.error('Failed to create ticket:', error);
      alert("Failed to create ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TicketForm;
