import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const token = sessionStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={{ marginRight: "10px" }}>
        Home
      </Link>
      {token && (
        <Link to="/post-item" className="nav-link" style={{ marginRight: "10px" }}>
          Post New Item
        </Link>
      )}
      <Link to="/home" className="nav-link" style={{ marginRight: "10px" }}>
        Main Page
      </Link>
    </nav>
  );
};

export default NavBar;