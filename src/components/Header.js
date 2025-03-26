import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const authorizeUrl = `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/authorize`;
    const clientId = process.env.REACT_APP_FUSIONAUTH_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI;
    const loginUrl = `${authorizeUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;
    console.log('Login URL:', loginUrl); // Debugging log
    window.location.href = loginUrl;
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          {isAuthenticated ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <li><button onClick={handleLogin}>Login</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
