import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        try {
          // Exchange authorization code for tokens
          const response = await fetch(`${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID,
              client_secret: process.env.REACT_APP_FUSIONAUTH_CLIENT_SECRET, // Add client secret in .env
              code,
              grant_type: 'authorization_code',
              redirect_uri: process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Token Data:", data); // Debugging: Log token data
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            navigate('/dashboard');
          } else {
            console.error('Token exchange failed:', response);
            navigate('/');
          }
          
        } catch (error) {
          console.error('Error during token exchange:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    getToken();
  }, [navigate]);

  return <div><h2>Redirecting to dashboard...</h2></div>;
};

export default Callback;
