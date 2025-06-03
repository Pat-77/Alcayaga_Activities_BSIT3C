// src/components/Tickets/TicketList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Tickets.css';
import { useAuth } from '../../contexts/AuthContext'; // ✅ Import context

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const { token } = useAuth(); // ✅ Get token from context

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/tickets/', {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Use context token
          }
        });
        setTickets(res.data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        alert('You must be logged in to view tickets.'); // Optional user-friendly message
      }
    };

    if (token) fetchTickets(); // ✅ Only fetch if token is present
  }, [token]);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
             <p>Location: {ticket.city || 'N/A'}, {ticket.region || ''} {ticket.country || ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
