import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token presence in localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set login state based on token presence
  }, []);

  const handleLogin = () => {
    const authorizeUrl = `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/authorize`;
    const clientId = process.env.REACT_APP_FUSIONAUTH_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI;

    // Construct login URL
    const loginUrl = `${authorizeUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = loginUrl; // Redirect to FusionAuth login
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear token on logout
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false); // Update state to reflect logged-out status
    window.location.href = '/'; // Redirect to home page after logout
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to Bunny's FusionAuth Dashboard</h1>
        <p>Your gateway to secure and seamless user authentication solutions.</p>
        
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <button onClick={handleLogin} className="login-button">Login</button>
          )}
        </div>
      </header>
      
      <section className="about-fusionauth">
        <h2>What is FusionAuth?</h2>
        <p>
          FusionAuth is a comprehensive authentication and authorization platform built for developers. 
          It offers a seamless experience for securing user identities with features like multi-factor 
          authentication, SSO, and OAuth support.
        </p>
      </section>
      
      <section className="about-bunny">
        <h2>About Bunny</h2>
        <p>
          I'm Bunny, a Solutions Engineer specializing in FusionAuth integrations. 
          My expertise helps teams create secure user experiences without sacrificing ease of use.
        </p>
      </section>
      
      <footer className="footer">
        <p>Powered by FusionAuth and Bunny's Expertise</p>
      </footer>
    </div>
  );
};

export default HomePage;
