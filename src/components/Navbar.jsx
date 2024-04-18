import { useState, useEffect } from 'react';
import { FaUser, FaBell, FaTrash, FaCheck } from 'react-icons/fa';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const handleUserClick = () => {
    // Aquí puedes agregar la lógica cuando se hace clic en el icono de usuario
  };

  const handleBellClick = () => {
    setShowNotifications(true);
    fetchNotificaciones();
  };

  const handleCloseModal = () => {
    setShowNotifications(false);
  };

  const fetchNotificaciones = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/notificaciones', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Notificaciones obtenidas:', responseData);
        setNotificaciones(responseData.data);
      })
      .catch(error => {
        console.error('Error al obtener las notificaciones:', error);
      });
  };

  const handleDeleteNotification = (id) => {
    // Lógica para eliminar la notificación con el ID proporcionado
    console.log('Eliminar notificación con ID:', id);
    
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/notificaciones/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`Notificación con ID ${id} eliminada exitosamente`);
          // Actualizar la lista de notificaciones después de eliminar
          fetchNotificaciones();
        } else {
          console.error(`Error al eliminar notificación con ID ${id}`);
        }
      })
      .catch(error => {
        console.error(`Error al eliminar notificación con ID ${id}:`, error);
      });
  };

  const handleMarkAsRead = (id) => {
    // Lógica para marcar la notificación como leída con el ID proporcionado
    console.log('Marcar notificación como leída con ID:', id);
    
    const token = localStorage.getItem('token');
    // Puedes elegir entre enviar una solicitud PUT o POST según la implementación de tu backend
    fetch(`http://localhost:3000/notificaciones/${id}`, {
      method: 'PUT', // o 'POST' dependiendo de la implementación del backend
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`Notificación con ID ${id} marcada como leída exitosamente`);
          // Actualizar la lista de notificaciones después de marcar como leída
          fetchNotificaciones();
        } else {
          console.error(`Error al marcar notificación con ID ${id} como leída`);
        }
      })
      .catch(error => {
        console.error(`Error al marcar notificación con ID ${id} como leída:`, error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotificaciones();
    }, 1000); // 1000 milisegundos = 1 segundo

    // Limpiar el temporizador para evitar fugas de memoria
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white">
      <div>
        <p className="text-left">Bienvenido 👋</p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <FaBell className="cursor-pointer" onClick={handleBellClick} />
          {showNotifications && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2>Notificaciones</h2>
                <ul>
                  {notificaciones.map(notificacion => (
                    <li key={notificacion.id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p>{notificacion.descripcion}</p>
                          <p>Fecha: {notificacion.fecha}</p>
                          <p>Estado: {notificacion.estado}</p>
                        </div>
                        <div className="flex items-center">
                          <FaTrash
                            className="cursor-pointer mr-2"
                            onClick={() => handleDeleteNotification(notificacion.id)}
                          />
                          <FaCheck
                            className="cursor-pointer"
                            onClick={() => handleMarkAsRead(notificacion.id)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleUserClick}
        >
          <FaUser className="ml-4 mr-2" />
          <p>Alejandro</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
