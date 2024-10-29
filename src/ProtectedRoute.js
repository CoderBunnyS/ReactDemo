import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
