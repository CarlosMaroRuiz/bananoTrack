import { useState } from 'react';
import {
  FaHome,
  FaInfo,
  FaServicestack,
  FaEnvelope,
  FaBars,
  FaTimes, // Importe el icono FaTimes
} from 'react-icons/fa';

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
          {' '}
          {/* Añadir un div para alinear los elementos */}
          <h1 className="text-xl font-extrabold">Dashboard</h1>
          <FaTimes onClick={() => setIsOpen(false)} />{' '}
          {/* Añadir el icono FaTimes que al hacer clic establece isOpen en false */}
        </div>
      ) : (
        <FaBars onClick={() => setIsOpen(true)} />
      )}
      <nav>
        <a
          href="#"
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <FaHome />
          {isOpen && <span>Home</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <FaInfo />
          {isOpen && <span>About</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <FaServicestack />
          {isOpen && <span>Services</span>}
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <FaEnvelope />
          {isOpen && <span>Contact</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
