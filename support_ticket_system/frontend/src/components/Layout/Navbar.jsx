import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#333", color: "white", display: "flex", gap: "1rem", alignItems: "center" }}>
      <Link to="/" style={{ color: "white" }}>Dashboard</Link>
      <Link to="/tickets" style={{ color: "white" }}>Tickets</Link>
      <Link to="/tickets/new" style={{ color: "white" }}>Create Ticket</Link>
      <div style={{ marginLeft: "auto" }}>
        {user && <span>Welcome, {user.username} </span>}
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
