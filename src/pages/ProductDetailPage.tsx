import React, { useState } from 'react';
import './ProductDetailPage.css';
import { useNavigate } from 'react-router-dom';

export default function ProductDetailPage() {
  const [cart, setCart] = useState<any[]>([]); // Giỏ hàng lưu trữ các sản phẩm
  const navigate = useNavigate();

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    const product = {
      id: 1, // ID sản phẩm
      name: "Product name",
      price: 10.99,
      image: "/9ef819ca5a41e11fb85010.jpg",
      quantity: 1,
    };

    // Thêm sản phẩm vào giỏ hàng
    setCart((prevCart) => [...prevCart, product]);

    // Lưu giỏ hàng vào localStorage (giúp giữ giỏ hàng sau khi làm mới trang)
    localStorage.setItem("cart", JSON.stringify([...cart, product]));

    // Chuyển đến trang thanh toán
    navigate("/checkout");
  };

  return (
    <>
      <div className="product-detail">
        <img src="/9ef819ca5a41e11fb85010.jpg" alt="detail" className="product-image" />
        <div className="product-info">
          <h3>Product name</h3>
          <p className="subheading">Subheading</p>
          <p className="price">$10.99</p>
          <p className="description">Body text for describing why this product is simply a must-buy</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
      <div className="product-container">
        <h3>Related products</h3>
        <div className="product-row">
          {/* Các sản phẩm liên quan */}
          <div className="product">
            <img src="/5b26c4089b8320dd79922.jpg" alt="banner" />
            <div className="product-info">
              <h4>Product 1</h4>
              <p>Description</p>
              <p>$10.99</p>
            </div>
          </div>
          <div className="product">
            <img src="/76d12d06738dc8d3919c4.jpg" alt="banner" />
            <div className="product-info">
              <h4>Product 2</h4>
              <p>Description</p>
              <p>$10.99</p>
            </div>
          </div>
          <div className="product">
            <img src="/251591c1cf4a74142d5b6.jpg" alt="banner" />
            <div className="product-info">
              <h4>Product 3</h4>
              <p>Description</p>
              <p>$10.99</p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
