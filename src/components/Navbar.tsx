import React from 'react';
import { Link } from 'react-router-dom';  // Đảm bảo đã cài react-router-dom
import './Navbar.css';

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="brand-name">
        <h1>Ocean's Embrace</h1>
      </div>
      <div className="nav-links">
        <a href="/shop">Shop Now</a>
        <a href="/search">Sell</a>
        <a href="/cart">Customize</a>
        <a href="/contact">Support</a>
        <Link to="/login" className="btn-sign-in">Sign in / Sign Up</Link>
      </div>
    </div>
  );
};

export default NavBar;
