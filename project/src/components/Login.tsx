import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Popcorn as Corn } from 'lucide-react';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
  setUserRole: (role: 'user' | 'admin' | null) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // User authentication
    if (username === 'admin' && password === 'Grower@1234') {
      setIsAuthenticated(true);
      setUserRole('user');
      setCurrentUser({ username: 'admin', role: 'user' });
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('username', 'admin');
      
      navigate('/user');
      return;
    }
    
    // Admin authentication
    if (username === 'admin@example.com' && password === 'admin@1234') {
      setIsAuthenticated(true);
      setUserRole('admin');
      setCurrentUser({ username: 'Admin', role: 'admin', email: 'admin@example.com' });
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', 'Admin');
      
      navigate('/admin');
      return;
    }
    
    setError('Invalid username or password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}>
      <div className="bg-white/90 p-8 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm">
        <div className="flex flex-col items-center mb-6">
          <Corn className="h-16 w-16 text-green-600 mb-2" />
          <h1 className="text-3xl font-bold text-green-800">Grower Management</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username / Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter username or email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>User login: admin / Grower@1234</p>
          <p>Admin login: admin@example.com / admin@1234</p>
        </div>
      </div>
    </div>
  );
};

export default Login;