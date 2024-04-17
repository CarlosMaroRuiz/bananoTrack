import { FaUser, FaBell } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleUserClick = () => {
    // Aquí puedes agregar la lógica cuando se hace clic en el icono de usuario
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <div>
        <p className="text-left">Bienvenido 👋</p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <FaBell className="cursor-pointer" onClick={handleBellClick} />
          {showNotifications && (
            <div className="absolute right-0 w-40 p-2 mt-2 bg-white border rounded shadow-xl">
              Aquí van las notificaciones
            </div>
          )}
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleUserClick}
        >
          {' '}
          {/* Aquí se hace clicable el nombre del usuario y el icono */}
          <FaUser className="ml-4 mr-2" />
          <p>Alejandro</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
