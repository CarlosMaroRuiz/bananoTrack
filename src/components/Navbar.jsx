import { useState, useEffect } from 'react';
import { FaUser, FaBell, FaTrash, FaCheck } from 'react-icons/fa';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const handleUserClick = () => {
    // Lógica cuando se hace clic en el icono de usuario
  };

  const handleBellClick = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotificaciones();
    }
  };

  const handleOutsideClick = () => {
    setShowNotifications(false);
  };

  const fetchNotificaciones = () => {
    const token = localStorage.getItem('token');
    fetch('http://3.215.18.246:3000/notificaciones', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Notificaciones obtenidas:', responseData);
        setNotificaciones(responseData.data);
      })
      .catch((error) => {
        console.error('Error al obtener las notificaciones:', error);
      });
  };

  const handleDeleteNotification = (id) => {
    console.log('Eliminar notificación con ID:', id);

    const token = localStorage.getItem('token');
    fetch(`http://3.215.18.246:3000/notificaciones/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Notificación con ID ${id} eliminada exitosamente`);
          fetchNotificaciones();
        } else {
          console.error(`Error al eliminar notificación con ID ${id}`);
        }
      })
      .catch((error) => {
        console.error(`Error al eliminar notificación con ID ${id}:`, error);
      });
  };

  const handleMarkAsRead = (id) => {
    console.log('Marcar notificación como leída con ID:', id);

    const token = localStorage.getItem('token');
    fetch(`http://3.215.18.246:3000/notificaciones/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Notificación con ID ${id} marcada como leída exitosamente`);
          fetchNotificaciones();
        } else {
          console.error(`Error al marcar notificación con ID ${id} como leída`);
        }
      })
      .catch((error) => {
        console.error(`Error al marcar notificación con ID ${id} como leída:`, error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotificaciones();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <div>
        <p className="text-left">Bienvenido 👋</p>
      </div>
      <div>
      <p className="text-left font-bold text-lg">Finca El Paraíso</p>
    </div>
      <div className="flex items-center">
        <div className="relative">
          <FaBell className="cursor-pointer" onClick={handleBellClick} />
          {showNotifications && (
            <div className="modal absolute block bg-[#F6BD43] w-96 h-auto right-0 rounded-lg mt-2 z-10" onClick={handleOutsideClick}>
              <div className="modal-content">
                <span className="close cursor-pointer text-2xl ml-2" onClick={() => setShowNotifications(false)}>&times;</span>
                <h2 className="text-center m-auto mb-4">Notificaciones</h2>
                <ul>
                  {notificaciones.map((notificacion) => (
                    <li key={notificacion.id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>{notificacion.descripcion}</p>
                          <p>Fecha: {notificacion.fecha}</p>
                          <p>Estado: {notificacion.estado}</p>
                        </div>
                        <div className="flex items-center">
                          <FaTrash className="cursor-pointer mr-2" onClick={() => handleDeleteNotification(notificacion.id)} />
                          <FaCheck className="cursor-pointer" onClick={() => handleMarkAsRead(notificacion.id)} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleUserClick}>
          <FaUser className="ml-4 mr-2" />
          <p>Alejandro</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
