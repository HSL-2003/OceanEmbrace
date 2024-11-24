import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Artwork = {
  artworkId: number;
  name: string;
  description: string;
  image: string;
  price: number;
  artistID: number;
  isPublic: boolean;
  isBuyAvailable: boolean;
  artworkRating: number;
  artworkDate: string;
  genreId: number;
  genreName: string | null;
  membersRated: any[];
};

const PurchaseSuccessPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Artwork | null>(null);

  const artworkId = 17; // Giả định sản phẩm có ID 17 đã được mua

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://poserdungeon.myddns.me:5000/api/artwork");
        const data = (await response.json()) as { items: Artwork[] };
        const purchasedProduct = data.items.find((item) => item.artworkId === artworkId) || null;
        setProduct(purchasedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchArtworks();
  }, [artworkId]);

  const handleBackToShop = () => {
    navigate("/shop");
  };

  return (
    <div className="purchase-success-container">
      <h1>Thank you for your purchase!</h1>
      <p>Your order was successful.</p>
      {product ? (
        <div className="product-info">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <p>
              <strong>Product Name:</strong> {product.name}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Price:</strong> {product.price.toLocaleString("vi-VN")} VND
            </p>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      <button className="back-to-shop-button" onClick={handleBackToShop}>
        Back to Shop
      </button>
    </div>
  );
};

export default PurchaseSuccessPage;
