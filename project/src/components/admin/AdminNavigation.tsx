import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, Database, Settings, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const AdminNavigation: React.FC = () => {
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
          to="/admin/users" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-600'}`
          }
        >
          <Users className="h-6 w-6 mb-1" />
          <span>Users</span>
        </NavLink>
        
        <NavLink 
          to="/admin/growers" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-600'}`
          }
        >
          <Database className="h-6 w-6 mb-1" />
          <span>Growers</span>
        </NavLink>
        
        <NavLink 
          to="/admin/options" 
          className={({ isActive }) => 
            `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-600'}`
          }
        >
          <Settings className="h-6 w-6 mb-1" />
          <span>Options</span>
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

export default AdminNavigation;