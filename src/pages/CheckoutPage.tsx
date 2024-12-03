import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./CheckoutPage.css";

interface CartItem {
  artworkId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]); // Giỏ hàng
  const [totalPrice, setTotalPrice] = useState<number>(0); // Tổng giá trị đơn hàng
  const [balance, setBalance] = useState<number>(0); // Số dư tài khoản
  const [loading, setLoading] = useState(false); // Trạng thái xử lý thanh toán

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Lấy thông tin người dùng
  const token = localStorage.getItem("token"); // Lấy token người dùng
  const navigate = useNavigate();

  // Lấy giỏ hàng từ localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    calculateTotalPrice(savedCart); // Tính tổng giá trị giỏ hàng khi trang tải
  }, []);

  // Lấy số dư tài khoản từ API
  useEffect(() => {
    const fetchBalance = async () => {
      if (!user.accountId || !token) {
        toast.error("Missing user information or token.");
        return;
      }

      try {
        const response = await axios.get(
          `http://poserdungeon.myddns.me:5000/balance/${user.accountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBalance(response.data.balance || 0); // Lấy số dư
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error("Failed to fetch balance.");
      }
    };

    fetchBalance();
  }, [user.accountId, token]);

  // Tính tổng giá trị đơn hàng
  const calculateTotalPrice = (cart: CartItem[]) => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Xử lý thay đổi số lượng sản phẩm trong giỏ
  const handleQuantityChange = (artworkId: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.artworkId === artworkId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart); // Cập nhật tổng giá trị
  };

  // Xử lý xóa sản phẩm khỏi giỏ
  const handleRemoveFromCart = (artworkId: number) => {
    const updatedCart = cart.filter((item) => item.artworkId !== artworkId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart); // Cập nhật tổng giá trị
  };

  // Xử lý thanh toán
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!user.accountId || !token) {
      toast.error("Please login to proceed with the purchase.");
      return;
    }

    // Tính tổng số lượng và tổng giá trị của đơn hàng
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Kiểm tra số dư tài khoản trước khi thanh toán
    if (balance < totalAmount) {
      toast.error("Insufficient balance. Please deposit more funds.");
      return;
    }

    // Tạo dữ liệu đơn hàng (bao gồm thông tin chi tiết từng sản phẩm)
    const orderDetails = cart.map((item) => ({
      artworkId: item.artworkId, // ID của sản phẩm
      unitPrice: item.price, // Giá của sản phẩm
      //quantity: item.quantity     // Số lượng sản phẩm
    }));

    const orderData = {
      buyerId: user.accountId, // ID người mua
      totalQuantity: totalQuantity, // Tổng số lượng sản phẩm
      totalAmount: totalAmount, // Tổng giá trị đơn hàng
      orderDetails: orderDetails, // Chi tiết các sản phẩm trong đơn hàng
    };

    console.log("Order Data to be sent:", orderData); // Kiểm tra dữ liệu gửi đi

    try {
      setLoading(true); // Bắt đầu trạng thái xử lý
      const response = await axios.post(
        "http://poserdungeon.myddns.me:5000/order", // URL API nơi bạn gửi đơn hàng
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token nếu có
          },
        }
      );

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi thanh toán thành công
        setCart([]); // Reset giỏ hàng
        

        
        await handlepage()
        setTotalPrice(0); // Reset tổng giá trị
        //  navigate("/thank"); // Chuyển hướng đến trang cảm ơn 
      }
      
    } catch (error: any) {
      console.error("Error while placing order", error);
      // if (error.response) {
      //   // Xử lý lỗi trả về từ API
      //   console.error("API Error:", error.response.data);
      //   toast.error(`Error: ${error.response.data.message || "Something went wrong"}`);
      // } else {
      //   toast.error("There was an error with your order. Please try again.");
      // }
    } finally {
      setLoading(false); // Kết thúc trạng thái xử lý
    }
  };

  const handlepage = async () => {

    const body = {
      
        transactionAmount: totalPrice,
        isMoneyDonation: true,
        isResourceDonation: true,
        userId: 1,
        transactionTypeId: 1
      
    };
    try {
      const res = await axios.post(
        `http://localhost:5111/api/Transaction/create`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        window.location.href = res.data.vnpayUrl;
      }
    } catch (err) {
      console.log(err);
    } 
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* Số dư người dùng */}
      <div className="balance-info">
        <p>Your Balance: ${balance.toFixed(2)}</p>
      </div>

      {/* Sản phẩm trong giỏ hàng */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.artworkId} className="cart-item">
              <img
                src={`http://poserdungeon.myddns.me:5000/artwork`}
                alt={item.name}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.artworkId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.artworkId,
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.artworkId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveFromCart(item.artworkId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tổng giá trị đơn hàng */}
      <div className="checkout-footer">
        <div className="total-price">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Purchase"}
        </button>
      </div>
    </div>
  );
}
