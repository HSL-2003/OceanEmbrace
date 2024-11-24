import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('prepaid'); // Trả trước mặc định
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Tính tổng tiền của giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleProceedToPayment = () => {
    // Giả lập thanh toán
    alert(`Proceeding to payment with ${paymentMethod === 'prepaid' ? 'Prepaid' : 'Pay Later'}`);
    navigate('/thank'); // Sau khi thanh toán, chuyển về trang chủ hoặc trang xác nhận
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Cập nhật phương thức thanh toán
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-container">
        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <form>
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="checkout-input"
            />
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="checkout-input"
            />
            <input
              type="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="checkout-input"
            />
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="checkout-input"
            />
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="order-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-info">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-price">${item.price}</p>
                    <div className="order-item-quantity">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value))
                        }
                        className="quantity-input"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <div className="order-total">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Phần chọn phương thức thanh toán */}
      <div className="payment-method">
  <h3>Payment Method</h3>
  <div className="payment-options">
    <label>
      <input
        type="radio"
        name="paymentMethod"
        value="prepaid"
        checked={paymentMethod === 'prepaid'}
        onChange={handlePaymentMethodChange}
      />
      <span></span> {/* Tạo hình tròn cho radio button */}
      Prepaid (Pay in advance)
    </label>
    <label>
      <input
        type="radio"
        name="paymentMethod"
        value="paylater"
        checked={paymentMethod === 'paylater'}
        onChange={handlePaymentMethodChange}
      />
      <span></span> {/* Tạo hình tròn cho radio button */}
      Pay Later (Cash on Delivery)
    </label>
  </div>
</div>

      <div className="checkout-actions">
        <button className="proceed-to-payment-button" onClick={handleProceedToPayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
