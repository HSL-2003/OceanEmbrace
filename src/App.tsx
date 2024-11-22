import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectInfoPage from './pages/ProjectInfoPage';
import SupportPage from './pages/SupportPage'; // Import trang Support
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/ProfilePage';
import ShopLandingPage from './pages/ShopLandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellPage from './pages/SellPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <NavBar />

        {/* Liên kết quay về trang chủ khi bấm vào logo */}
        <h2 className="homepage-title">
          <Link to="/" className="homepage-link">Home</Link>
        </h2>

        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shop" element={<ShopLandingPage />} />
          <Route path="/detail" element={<ProductDetailPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-info" element={<ProjectInfoPage />} />
          <Route path="/support" element={<SupportPage />} /> {/* Route mới cho trang Support */}
        </Routes>

        {/* Footer hiển thị ở tất cả các trang */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
