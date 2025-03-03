import React from 'react';
import { useUser } from '../../context/UserContext';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();
  
  const username = currentUser?.username || localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-600 p-6 flex flex-col items-center">
          <div className="bg-white p-4 rounded-full mb-3">
            <User className="h-16 w-16 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-white">{username}</h2>
          <p className="text-green-100">User</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-3">
                <p className="text-sm text-gray-600">Username</p>
                <p className="font-medium">{username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium">Grower Management User</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">App Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-3">
                <p className="text-sm text-gray-600">Version</p>
                <p className="font-medium">1.0.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;