import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, User, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const UserNavigation: React.FC = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        <NavLink 
          to="/user" 
          end
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-green-600' : 'text-gray-600'}`
          }
        >
          <Home className="h-6 w-6 mb-1" />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/user/search" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-green-600' : 'text-gray-600'}`
          }
        >
          <Search className="h-6 w-6 mb-1" />
          <span>Search</span>
        </NavLink>
        
        <NavLink 
          to="/user/add" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-green-600' : 'text-gray-600'}`
          }
        >
          <PlusCircle className="h-6 w-6 mb-1" />
          <span>Add Grower</span>
        </NavLink>
        
        <NavLink 
          to="/user/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-green-600' : 'text-gray-600'}`
          }
        >
          <User className="h-6 w-6 mb-1" />
          <span>Profile</span>
        </NavLink>
        
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-gray-600"
        >
          <LogOut className="h-6 w-6 mb-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserNavigation;