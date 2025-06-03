// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import TicketList from './components/Tickets/TicketList';
import TicketCreate from "./components/Tickets/TicketCreate";
import TicketDetail from "./components/Tickets/TicketDetail";
import TicketForm from "./components/Tickets/TicketForm";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from "./components/Layout/Layout";
import AdminRoute from './components/ProtectedRoute'; // or './routes/AdminRoute'
import AdminPanel from './components/AdminPanel'; // or wherever your admin UI is
import Unauthorized from './components/Unauthorized'; // optional


function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider> {/* ✅ wrap the entire Router in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin-panel" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/admin-panel" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Wrapped in Layout so Navbar shows */}
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />

          <Route path="/tickets" element={<PrivateRoute><Layout><TicketList /></Layout></PrivateRoute>} />

          <Route path="/tickets/new" element={<PrivateRoute><Layout><TicketCreate /></Layout></PrivateRoute>} />

          {/* Optional route for viewing a single ticket */}
          <Route path="/tickets/:id" element={<PrivateRoute><Layout><TicketDetail /></Layout></PrivateRoute>} />

          <Route path="/tickets/new" element={<PrivateRoute><Layout><TicketForm /></Layout></PrivateRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
