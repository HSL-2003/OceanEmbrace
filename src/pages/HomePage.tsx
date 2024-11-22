import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';

const HomePage: React.FC = () => {
  const articles = [
    { id: 1, title: 'Trang sức vỏ sò tự nhiên', description: 'Khám phá những món trang sức được làm từ vỏ sò tự nhiên, độc đáo và bền vững.' },
    { id: 2, title: 'Vẻ đẹp của vỏ sò trong nghệ thuật trang sức', description: 'Những món trang sức mang đậm nét văn hóa biển cả, nhẹ nhàng và tinh tế.' },
    { id: 3, title: 'Trang sức vỏ sò cho mùa hè', description: 'Trang sức vỏ sò là lựa chọn tuyệt vời cho những ngày hè nắng vàng.' },
  ];

  const reviews = [
    { id: 1, name: 'Nguyễn Thị Mai', review: 'Sản phẩm tuyệt vời! Trang sức làm từ vỏ sò tự nhiên thật độc đáo và đẹp mắt, tôi cảm thấy rất hài lòng với lựa chọn này.' },
    { id: 2, name: 'Trần Văn Dũng', review: 'Mua món này làm quà tặng cho bạn bè, ai cũng khen đẹp và khác biệt. Chắc chắn sẽ quay lại mua thêm!' },
    { id: 3, name: 'Lê Minh Tuấn', review: 'Thiết kế nhẹ nhàng nhưng vô cùng nổi bật, dễ dàng kết hợp với nhiều loại trang phục. Sẽ giới thiệu cho bạn bè!' },
  ];

  return (
    <div className="homepage">
      {/* HeroSection và ProductSection */}
      <HeroSection />
      <ProductSection />

      {/* Các bài viết */}
      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>
            <button className="read-more">Đọc thêm</button>
          </div>
        ))}
      </div>

      {/* Đánh giá của khách hàng */}
      <div className="reviews">
        <h3>Đánh giá của khách hàng</h3>
        <div className="review-cards">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-name">{review.name}</p>
              <p className="review-text">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;