import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
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
import CheckoutPage from './pages/CheckoutPage';
import ThankPage from './pages/ThankPage';
import BalancePage from './pages/BalancePage';
import WithdrawPage from './pages/WithdrawPage';
import DepositPage from './pages/DepositPage';
import HistoryPage from './pages/HistoryPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <NavBar />

      

        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shop" element={<ShopLandingPage />} />
          <Route path="/detail/:id" element={<ProductDetailPage />} /> {/* Sửa lại đường dẫn */}
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-info" element={<ProjectInfoPage />} />
          <Route path="/support" element={<SupportPage />} /> {/* Route mới cho trang Support */}
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/thank" element ={<ThankPage/>}/> 
          <Route path="/orderhistory" element ={<OrderHistoryPage/>}/>
          <Route path='/balance' element ={<BalancePage/>}></Route>
          <Route path="/history" element={<HistoryPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        </Routes>

        {/* Footer hiển thị ở tất cả các trang */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
