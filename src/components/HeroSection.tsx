import React from 'react';
import { Link } from 'react-router-dom';  // Nhập Link từ react-router-dom
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h2>Trang sức làm từ vỏ sò tự nhiên</h2>
        <p>Khám phá những sản phẩm trang sức tinh tế, được làm từ vỏ sò đại dương.</p>
        <Link to="/project-info" className="btn-shop">Tìm Hiểu Thêm</Link> {/* Cập nhật Link */}
      </div>
    </div>
  );
};

export default HeroSection;
