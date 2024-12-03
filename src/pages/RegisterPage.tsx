import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

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
      // Tạo đối tượng data chứa thông tin cần gửi
      
  
      const response = await axios.post('http://poserdungeon.myddns.me:5000');  // Gửi dữ liệu qua body request
        fullName,
        emailAddress,
        password,
        confirmPassword,
      };
      if (response.status === 200) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error('Registration failed', error);
      toast.error("Error registering user");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='btn-submit' type="submit">Đăng Ký</button>
        </form>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

