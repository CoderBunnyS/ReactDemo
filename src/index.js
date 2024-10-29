import React from 'react';
import ReactDOM from 'react-dom/client';
import { FusionAuthProvider } from '@fusionauth/react-sdk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const config = {
  clientId: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID,
  redirectUri: process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI,
  serverUrl: process.env.REACT_APP_FUSIONAUTH_BASE_URL,
  applicationId: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID, // Ensures correct app context
  shouldAutoFetchUserInfo: true,
  shouldAutoRefresh: true,
  loginOnLoad: true, // Forces login check on load
  onRedirect: () => {
    window.location.href = '/dashboard';
  },
};





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FusionAuthProvider config={config}>
      <App />
    </FusionAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
