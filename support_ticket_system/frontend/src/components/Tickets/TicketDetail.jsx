// frontend\src\components\Tickets\TicketDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import './Tickets.css';

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/tickets/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicket(res.data);
      } catch (error) {
        console.error('Failed to fetch ticket:', error);
      }
    };

    if (token) {
      fetchTicket();
    }
  }, [id, token]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Location: {ticket.city || 'N/A'}, {ticket.region || ''} {ticket.country || ''}</p>
    </div>
  );
}

export default TicketDetail;
