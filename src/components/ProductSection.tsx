import React from 'react';
import './ProductSection.css';

const ProductSection: React.FC = () => {
  const products = [
    { 
      title: 'BRACELET', 
      description: 'Chi tiết về sản phẩm ', 
      image: '../assets/vongtay.jpg' // Đường dẫn đến ảnh
    },
    { 
      title: 'NECKLACE', 
      description: 'Chi tiết về sản phẩm ', 
      image: '../assets/vongco.jpg' // Đường dẫn đến ảnh
    },
    { 
      title: 'HANDMADE', 
      description: 'Chi tiết về sản phẩm ', 
      image: '../assets/handmade.jpg' // Đường dẫn đến ảnh
    },
  ];

  return (
    <div className="product-section">
      <h3>Sản phẩm nổi bật</h3>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <a href="/shop" className="btn-buy">Mua ngay</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
