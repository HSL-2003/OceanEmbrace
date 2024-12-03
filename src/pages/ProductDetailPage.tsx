import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.css";

interface ProductDetail {
  artworkId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number; // Thêm thuộc tính quantity vào ProductDetail
}

interface TopChoiceProduct {
  artworkId: number;
  name: string;
  image: string;
  price: number;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [allProducts, setAllProducts] = useState<ProductDetail[]>([]); // Lưu tất cả sản phẩm
  const [topChoiceProducts, setTopChoiceProducts] = useState<TopChoiceProduct[]>([]); // Sản phẩm top choice
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy chi tiết sản phẩm và tất cả sản phẩm
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://poserdungeon.myddns.me:5000/artwork/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          setError("Failed to fetch product details. Please try again later.");
        }
      } catch (error) {
        setError("Error fetching product details. Please check your connection.");
      }
    };
    

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://poserdungeon.myddns.me:5000/artwork"
        );
        if (response.status === 200) {
          setAllProducts(response.data.items);
        } else {
          setError("Failed to fetch all products.");
        }
      } catch (error) {
        setError("Error fetching all products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    fetchAllProducts();
  }, [id]);

  // Lấy các sản phẩm top choice (ví dụ: 4 sản phẩm ngẫu nhiên từ danh sách allProducts)
  useEffect(() => {
    if (allProducts.length > 0) {
      const randomProducts = allProducts
        
        .slice(4, 8); // Lấy 4 sản phẩm
      setTopChoiceProducts(randomProducts);
    }
  }, [allProducts]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProduct = cart.find(
        (item: ProductDetail) => item.artworkId === product.artworkId
      );

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1; // Cập nhật quantity
      } else {
        product.quantity = 1; // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} has been added to your cart!`);
    }
  };
  
   
  const handleGoToCheckout = () => {
    navigate("/checkout"); // Điều hướng đến trang checkout
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }
  

  return (
    <div className="product-detail-container">
      
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <button className="go-to-checkout-btn" onClick={handleGoToCheckout}>
        Go to Checkout
      </button>
      <div className="product-detail">
        <div className="product-detail-left">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-img"
          />
        </div>
        
        
        <div className="product-detail-right">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Top Choice Products Section */}
      <div className="top-choice-container">
        <h3>Top Choice</h3>
        <div className="top-choice-row">
          {topChoiceProducts.map((topProduct) => (
            <div
              key={topProduct.artworkId}
              className="top-choice-product"
              onClick={() => navigate(`/detail/${topProduct.artworkId}`)} // Điều hướng đến chi tiết sản phẩm top choice
            >
              <img
                src={topProduct.image}
                alt={topProduct.name}
                className="top-choice-img"
              />
              <div className="top-choice-info">
                <h4>{topProduct.name}</h4>
                <p>${topProduct.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
