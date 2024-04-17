import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

// Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        <div className="grid grid-rows-3 gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="bg-white p-4 rounded-xl h-64">Columna 1</div>
            <div className="bg-white p-4 rounded-xl h-64">Columna 2</div>
            <div className="bg-white p-4 rounded-xl h-64">Columna</div>
          </div>
          <div className="bg-white p-4 rounded-xl">Columna 1</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl">Columna 1</div>
            <div className="bg-white p-4 rounded-xl">Columna 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
