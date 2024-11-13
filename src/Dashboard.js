import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, logout } = useAuth(); // Single destructure for useAuth
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  useEffect(() => {
    const exchangeToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      // Only proceed if code exists in the URL and token is not already stored
      if (code && !localStorage.getItem('access_token')) {
        console.log("Authorization Code from URL:", code);

        try {
          const tokenResponse = await fetch(`${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID,
              client_secret: process.env.REACT_APP_FUSIONAUTH_CLIENT_SECRET,
              code,
              grant_type: 'authorization_code',
              redirect_uri: process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI,
            }),
          });

          const tokenData = await tokenResponse.json();
          console.log("Full Token Response:", tokenData);

          if (tokenResponse.ok && tokenData.access_token) {
            console.log("Received Access Token:", tokenData.access_token);
            localStorage.setItem('access_token', tokenData.access_token);
            localStorage.setItem('refresh_token', tokenData.refresh_token);
            setIsAuthenticated(true); // Update authentication status
            // Remove code from URL after token exchange
            window.history.replaceState({}, document.title, "/dashboard");
          } else {
            console.error('Token exchange failed:', tokenData);
            navigate('/');
          }
        } catch (error) {
          console.error('Error during token exchange:', error);
          navigate('/');
        } finally {
          setLoading(false); // Stop loading spinner after exchange attempt
        }
      } else {
        // Case when no code is found in URL or token already exists
        console.log("No authorization code found in URL or token already exists.");
        setLoading(false);
      }
    };

    exchangeToken();
  }, [navigate, setIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This content is only visible to logged-in users.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
