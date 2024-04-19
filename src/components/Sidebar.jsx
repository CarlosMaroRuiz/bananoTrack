import { useState } from 'react';
import { FaHome, FaBars, FaTimes, FaThermometer, FaTint } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-[#F6BD43] text-white w-50 space-y-6 py-7 px-2 relative inset-y-0 left-0 transform transition-transform duration-200 ease-in-out ${
        isOpen ? '' : 'w-20'
      }`}
    >
      {isOpen ? (
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-extrabold">Dashboard</h1>
          <FaTimes onClick={() => setIsOpen(false)} />
        </div>
      ) : (
        <FaBars onClick={() => setIsOpen(true)} />
      )}
      <nav>
        <Link to="/dashboard" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaHome />
          {isOpen && <span>Home</span>}
        </Link>
        <Link to="/calor" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaThermometer />
          {isOpen && <span>Datos de Calor</span>}
        </Link>
        <Link to="/humedad" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaTint />
          {isOpen && <span>Datos de Humedad</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
