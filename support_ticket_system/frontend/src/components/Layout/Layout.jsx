// src/components/Layout/Layout.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../AuthDashboardLayout.css';


function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/tickets">Tickets</Link> |{' '}
        <Link to="/tickets/new">New Ticket</Link>
        <span style={{ float: 'right' }}>
          {user && <span>Welcome, {user.username}! </span>}
          <button onClick={handleLogout}>Logout</button>
        </span>
      </nav>
      <main style={{ padding: '20px' }}>{children}</main>
    </div>
  );
}

export default Layout;
