import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage: React.FC = () => {
    console.log('Support page rendered'); // Kiểm tra trang có render không
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bạn có thể xử lý gửi thông tin từ đây, ví dụ như gọi API.
    alert('Your message has been sent!');
  };

  return (
    <div className="support-page">
      <h2 className="page-title">Hỗ Trợ Khách Hàng</h2>

      <section className="contact-info">
        <h3>Thông tin liên hệ</h3>
        <p><strong>Email:</strong> support@oceansembrace.com</p>
        <p><strong>Phone:</strong> +84 8999 01359 </p>
        <p><strong>Địa chỉ:</strong> 288 Nguyễn Thị Minh Khai, Hóc Môn, TP.HCM, Việt Nam</p>
      </section>

      <section className="faq">
        <h3>Câu hỏi thường gặp (FAQ)</h3>
        <ul>
          <li><strong>Câu hỏi 1:</strong> Làm thế nào để mua sản phẩm?</li>
          <li>Trả lời: Bạn có thể chọn sản phẩm yêu thích và thực hiện mua hàng trực tiếp trên website của chúng tôi.</li>
          <li><strong>Câu hỏi 2:</strong> Sản phẩm có bảo hành không?</li>
          <li>Trả lời: Tất cả sản phẩm của chúng tôi đều có bảo hành trong vòng 6 tháng.</li>
        </ul>
      </section>

      <section className="contact-form">
        <h3>Liên hệ với chúng tôi</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Chủ đề</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Chọn chủ đề</option>
              <option value="order">Về đơn hàng</option>
              <option value="product">Về sản phẩm</option>
              <option value="support">Yêu cầu hỗ trợ</option>
              <option value="others">Khác</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Lời nhắn</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nhập lời nhắn của bạn"
              required
            ></textarea>
          </div>

          <button type="submit">Gửi tin nhắn</button>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;
