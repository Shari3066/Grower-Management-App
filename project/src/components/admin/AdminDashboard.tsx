import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import Users from './Users';
import GrowerDetails from './GrowerDetails';
import AddGrowerOptions from './AddGrowerOptions';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<GrowerDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/growers" element={<GrowerDetails />} />
          <Route path="/options" element={<AddGrowerOptions />} />
        </Routes>
      </div>
      <AdminNavigation />
    </div>
  );
};

export default AdminDashboard;