import React from 'react'
import './ProductDetailPage.css'
import { useNavigate } from 'react-router-dom';


export default function ProductDetailPage() {
    const navigate = useNavigate();
    const navToDetail = () => {
        navigate("/detail")
    }
    return (
        <>
            <div className="product-detail">
                <img src="/9ef819ca5a41e11fb85010.jpg" alt="detail" className="product-image" />
                <div className="product-info">
                    <h3>Product name</h3>
                    <p className="subheading">Subheading</p>
                    <p className="price">$10.99</p>
                    <p className="description">Body text for describing why this product is simply a must-buy</p>
                    <button className="add-to-cart">Add to cart</button>
                </div>
            </div>
            <div className="product-container">
                <h3>Related products</h3>
                <div className="product-row">
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/5b26c4089b8320dd79922.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/76d12d06738dc8d3919c4.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/251591c1cf4a74142d5b6.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
