
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [accountPassword, setAccountPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://poserdungeon.myddns.me:5000/login', {
        emailAddress,
        accountPassword,
      });
      if (response.status === 200) {
        toast.success("Login successful")
        window.localStorage.setItem("token", response.data.token)
        navigate("/")
      } else {
        toast.error("Login fail")
      }
      // Chuyển hướng hoặc thông báo thành công
    } catch (error) {
      toast.error("Login fail")
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label>Email Address</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Account Password</label>
            <input
              type="password"
              value={accountPassword}
              onChange={(e) => setAccountPassword(e.target.value)}
              required
            />
          </div>
          <button className='btn-submit' type="submit">Đăng Nhập</button>
        </form>
        <p>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;