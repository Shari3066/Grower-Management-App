import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';
import { GrowerProvider } from './context/GrowerContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    
    if (auth === 'true' && (role === 'user' || role === 'admin')) {
      setIsAuthenticated(true);
      setUserRole(role as 'user' | 'admin');
    }
  }, []);

  return (
    <UserProvider>
      <GrowerProvider>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? 
              <Navigate to={userRole === 'admin' ? '/admin' : '/user'} /> : 
              <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />
          } />
          
          <Route path="/user/*" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/*" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </GrowerProvider>
    </UserProvider>
  );
}

export default App;