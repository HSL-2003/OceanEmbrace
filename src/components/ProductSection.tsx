import React from 'react';
import './ProductSection.css';
import braceletImg from '../assets/vongtay.jpg';
import necklaceImg from '../assets/vongco.jpg';
import handmadeImg from '../assets/handmade.jpg';

const ProductSection: React.FC = () => {
  const products = [
    { title: 'BRACELET', description: 'Chi tiết về sản phẩm', image: braceletImg },
    { title: 'NECKLACE', description: 'Chi tiết về sản phẩm', image: necklaceImg },
    { title: 'HANDMADE', description: 'Chi tiết về sản phẩm', image: handmadeImg },
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
