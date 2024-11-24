import React from 'react';
import './ThankPage.css';
import { useNavigate } from 'react-router-dom';

const ThankPage: React.FC = () => {
    console.log('ThankPage Render')
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  };

  return (
    <div className="thank-page">
      <div className="thank-container">
        <h2>Thank You!</h2>
        <p>Your purchase was successful. We appreciate your trust in us!</p>
        <button onClick={redirectHome} className="go-home-button">
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankPage;
