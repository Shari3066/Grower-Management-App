import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userRole: 'user' | 'admin' | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated, 
  userRole 
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const path = window.location.pathname;
  
  // If trying to access admin routes but not an admin
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return <Navigate to="/user" />;
  }
  
  // If trying to access user routes but not a user
  if (path.startsWith('/user') && userRole !== 'user') {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;