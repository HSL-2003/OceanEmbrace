import { useState, useEffect } from "react";
import axios from "axios";
import "./OrderHistoryPage.css";

interface Order {
  orderId: number;
  totalQuantity: number;
  totalAmount: number;
  orderDate: string;
  orderDetails: Array<{
    artworkId: number;
    name: string;
    unitPrice: number;
    quantity: number;
  }>;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]); // Danh sách đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState<string | null>(null); // Lỗi (nếu có)

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Lấy thông tin người dùng
  const token = localStorage.getItem("token"); // Token xác thực

  useEffect(() => {
    const fetchOrders = async () => {
     

      try {
        const response = await axios.get(
          `http://poserdungeon.myddns.me:5000/order/buyer/${user.accountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data)
        if (response.status === 200) {
          setOrders(response.data );
        } else {
          setError("Failed to fetch order history.");
        }
      } catch (err) {
        setError("Error fetching order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.accountId, token]);

  if (loading) {
    return <div className="loading">Loading order history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  

  return (
    <div className="order-history-page">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders?.map((order) => (
            <div key={order.orderId} className="order-card">
              <h3>Order ID: {order.orderId}</h3>
              <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total Quantity: {order.totalQuantity}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <div className="order-details">
                <h4>Order Details:</h4>
                {order.orderDetails.map((item) => (
                  <div key={item.artworkId} className="order-item">
                    <p>Artwork: {item.artworkId}</p>
                    <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
                    
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
