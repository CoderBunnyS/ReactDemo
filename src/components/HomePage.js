import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/HomePage.css';
import Logo from '../assets/Logo.png';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    const authorizeUrl = `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/authorize`;
    const clientId = process.env.REACT_APP_FUSIONAUTH_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI;

    const loginUrl = `${authorizeUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;

    console.log('Login URL:', loginUrl); // Debugging log
    window.location.href = loginUrl;
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src={Logo} alt="FusionAuth Logo" className="fusionauth-logo" />
      </header>
      <div className="homepage-content">
        <h1>Welcome to Bunny's FusionAuth Dashboard</h1>
        <p>Your gateway to secure and seamless user authentication solutions.</p>
        {!isLoggedIn && (
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
