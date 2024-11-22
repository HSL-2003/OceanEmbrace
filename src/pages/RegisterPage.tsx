import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    try {
      const response = await axios.post('http://poserdungeon.myddns.me:5000/register', {
        fullName,
        emailAddress,
        password,
        confirmPassword,
      });
      console.log('Registration successful', response.data);
      // Chuyển hướng hoặc thông báo thành công
    } catch (error) {
      console.error('Registration failed', error);
      // Thông báo lỗi đăng ký
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
      <p>
        Đã có tài khoản? <a href="/login">Đăng nhập</a>
      </p>
    </div>
  );
};

export default RegisterPage;

