  
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [accountPassword, setAccountPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://poserdungeon.myddns.me:5000/login', {
        emailAddress,
        accountPassword,
      });
      console.log('Login successful', response.data);
      // Chuyển hướng hoặc thông báo thành công
    } catch (error) {
      console.error('Login failed', error);
      // Thông báo lỗi đăng nhập
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Password</label>
          <input
            type="password"
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
      <p>
        Chưa có tài khoản? <a href="/register">Đăng ký</a>
      </p>
    </div>
  );
};
export default LoginPage;