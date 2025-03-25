import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const token = sessionStorage.getItem("token");

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {token && (
        <Link to="/post-item" className="nav-link">Post New Item</Link>
      )}
      <Link to="/home" className="nav-link">Main Page</Link>
    </nav>
  );
};

export default NavBar;