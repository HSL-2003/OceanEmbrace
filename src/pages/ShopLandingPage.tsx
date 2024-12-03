import { useState, useEffect } from "react";
import "./ShopLandingPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  artworkId: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ShopLandingPage() {
  const [products, setProducts] = useState<Product[]>([]); // Danh sách sản phẩm từ API
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Danh sách sản phẩm đã lọc
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const navigate = useNavigate();

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://poserdungeon.myddns.me:5000/artwork"
        );
        if (response.status === 200 && response.data.items) {
          setProducts(response.data.items); // Đảm bảo dữ liệu hợp lệ
          setFilteredProducts(response.data.items); // Hiển thị toàn bộ sản phẩm ban đầu
        } else {
          setError("Failed to fetch products. Please try again later.");
        }
      } catch (error) {
        setError("Error fetching products. Please check your connection.");
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchProducts();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const navToDetail = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Find Someone ?..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">
          🔍 {/* Biểu tượng tìm kiếm */}
        </button>
      </div>

      {/* Banner */}
      <Banner />

      {/* Kết quả tìm kiếm */}
      {filteredProducts.length > 0 ? (
        <>
          {/* Our Products Section */}
          <ProductSection
            title="Our Products"
            products={filteredProducts.slice(0, 6)}
            onProductClick={navToDetail}
          />

          {/* Top Sales Section */}
          <ProductSection
            title="Top Sales"
            products={filteredProducts.slice(7, 10)}
            onProductClick={navToDetail}
          />
        </>
      ) : (
        <p className="no-results">No products found.</p>
      )}
    </>
  );
}

// Banner Component
const Banner: React.FC = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <img src="/profile.jpg" alt="banner" />
        <div className="content">
          <h3>Necklace and More!</h3>
          <p>Find unique and handcrafted items.</p>
          
        </div>
      </div>
    </div>
  );
};

// ProductSection Component
interface ProductSectionProps {
  title: string;
  products: Product[];
  onProductClick: (productId: number) => void;
}


const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  onProductClick,
  
}) => {
  return (
    <div className="product-container">
      <h3>{title}</h3>
      <div className="product-row">
        {products.map((product) => (
          <div
            key={product.artworkId}
            className="product"
            onClick={() => onProductClick(product.artworkId)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
           
            
            
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
