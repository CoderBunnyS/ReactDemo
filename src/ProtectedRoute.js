import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log("Protected Route - isAuthenticated:", isAuthenticated); // Debug log
  console.log("Protected Route - loading:", loading); // Debug log

  if (loading) return <p>Loading...</p>; // Wait until loading is complete

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
