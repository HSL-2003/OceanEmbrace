import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Đảm bảo đã cài react-router-dom
import './Navbar.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token")
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser !== null ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user === null && token !== null) {
      userInformation();
    }
  }, [token])

  const userInformation = async () => {
    try {
      const response = await axios.get('http://poserdungeon.myddns.me:5000/profile', {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      if (response.status === 200) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
        setUser(response.data)
      }
    } catch (error) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      navigate("/login");
      toast.error("Unauthorized access. Redirecting to login.");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart')
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className="navbar">
      <div className="brand-name">
        <h1>Ocean's Embrace</h1>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/shop">Shop Now</a>
        <a href='checkout'>Check Out</a>
        <a href="/orderhistory">History</a>
        <a href="/cart">Customize</a>
        <a href="/support">Support</a>
        {user === null ?
          <Link to="/login" className="btn-sign-in">Sign in / Sign Up</Link>
          : <div className="avatar-navbar-container">
            <a className='avatar-navbar' href='/profile'>
              <img
                src={user.avatar || '/vongco.jpg'}
                alt="avatar"
              />
              {user.fullName}
            </a>
            <div className="dropdown-menu">
              <Link to="/profile" className="profile-link">Profile</Link>
              <Link to="/balance" className='balance-link'>Balance</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>}
      </div>
    </div>
  );
};

export default NavBar;
