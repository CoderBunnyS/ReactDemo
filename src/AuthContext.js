import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    const fusionAuthLogoutUrl = `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/logout?client_id=${process.env.REACT_APP_FUSIONAUTH_CLIENT_ID}&post_logout_redirect_uri=${encodeURIComponent("http://localhost:3000")}`;
    window.location.href = fusionAuthLogoutUrl;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
