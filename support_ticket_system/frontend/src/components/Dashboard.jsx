// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthDashboardLayout.css';

function Dashboard() {
  const role = localStorage.getItem('userRole');

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <nav>
        <Link to="/tickets">View Tickets</Link> |{' '}
        <Link to="/tickets/create">Create Ticket</Link>
      </nav>

      {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

const AdminDashboard = () => (
  <div className="role-section">
    <h2>Admin Controls</h2>
    <ul>
      <li>Manage all tickets</li>
      <li>Manage users or categories (if applicable)</li>
      {/* Add more admin-specific controls here */}
    </ul>
  </div>
);

const UserDashboard = () => (
  <div className="role-section">
    <h2>User Area</h2>
    <ul>
      <li>Submit support tickets</li>
      <li>View and comment on your tickets</li>
      {/* Add more user-specific options here */}
    </ul>
  </div>
);

export default Dashboard;
