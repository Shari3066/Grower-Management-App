import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserNavigation from './UserNavigation';
import Home from './Home';
import Search from './Search';
import AddGrower from './AddGrower';
import Profile from './Profile';
import EditGrower from './EditGrower';

const UserDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddGrower />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:id" element={<EditGrower />} />
        </Routes>
      </div>
      <UserNavigation />
    </div>
  );
};

export default UserDashboard;