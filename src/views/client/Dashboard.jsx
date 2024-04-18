import { useEffect, useRef, useState } from 'react';
import { FaSun, FaTint, FaFilePdf } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import CarouselComponent from '../../components/Carousel';
import setupWebSocket from '../../components/socket';
import ReportGenerator from '../../components/reporte';

const Dashboard = () => {
  const chartRef = useRef(null);
  const humidityChartRef = useRef(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [luzData, setLuzData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [reportData] = useState([]);
  const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');

  useEffect(() => {
    const ws = setupWebSocket((data) => {
      console.log('Datos recibidos del WebSocket:', data);
      setTemperatureData(data);
      setHumidityData(data);
      setLuzData(data);
      setDistanceData(data);
    });

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    let chartInstance = null;
  
    if (chartRef.current && temperatureData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
  
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: temperatureData.map(item => item.fecha),
          datasets: [
            {
              label: 'Temperatura (°C)',
              data: temperatureData.map(item => item.temperatura),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temperatura (°C)',
              },
            },
            x: {
              display: false,
            },
          },
        },
      });
    }
  
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [temperatureData]);
  
  useEffect(() => {
    let humidityChartInstance = null;
  
    if (humidityChartRef.current && humidityData.length > 0) {
      const ctx = humidityChartRef.current.getContext('2d');
  
      humidityChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: humidityData.map(item => item.fecha),
          datasets: [{
            label: 'Humedad',
            data: humidityData.map(item => item.humedad),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Humedad (%)',
              },
            },
            x: {
              display: false,
            },
          },
        },
      });
    }
  
    return () => {
      if (humidityChartInstance) {
        humidityChartInstance.destroy();
      }
    };
  }, [humidityData]);

  const handleAddNotification = () => {
    setShowAddNotificationModal(true);
  };

  const handleModalClose = () => {
    setShowAddNotificationModal(false);
    // Limpiar los campos del modal cuando se cierra
    setNotificationType('');
    setNotificationDescription('');
  };

  const handleSendNotification = () => {
    // Lógica para enviar la notificación a la base de datos con el token
    console.log('Enviar notificación:', notificationType, notificationDescription);
    const token = localStorage.getItem('token');

    fetch('http://3.215.18.246:3000/notificaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        tipo: notificationType,
        descripcion: notificationDescription,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Notificación enviada exitosamente');
        alert('¡Notificación enviada exitosamente!');
        // Aquí puedes realizar cualquier acción adicional después de enviar la notificación
      } else {
        console.error('Error al enviar la notificación');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });

    // Cierra el modal después de enviar la notificación
    handleModalClose();
  };

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        <div className="grid grid-rows-3 gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl h-64 flex flex-col items-center justify-center">
              <h3 className="mb-4">Descargar Reporte</h3>
              <div className="text-center flex justify-center items-center text-4xl">
                <ReportGenerator data={reportData} />
                <div className="text-7xl text-blue-500 mt-4">
                  <FaFilePdf />
                </div>
              </div>
              <button onClick={handleAddNotification} className="mt-10 bg-blue-500 text-white px-3 py-1 rounded-md">Agregar Notificación</button>
              {showAddNotificationModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-md">
                    <h2 className="text-xl font-bold mb-4">Agregar Notificación</h2>
                    <input type="text" placeholder="Tipo" value={notificationType} onChange={(e) => setNotificationType(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 mb-2" />
                    <textarea placeholder="Descripción" value={notificationDescription} onChange={(e) => setNotificationDescription(e.target.value)} className="block w-full border-gray-300 rounded-md p-2 mb-2"></textarea>
                    <div className="flex justify-end">
                      <button onClick={handleModalClose} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md mr-2">Cancelar</button>
                      <button onClick={handleSendNotification} className="bg-blue-500 text-white px-3 py-1 rounded-md">Enviar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded-xl h-64">
              <canvas ref={humidityChartRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="bg-white p-4 rounded-xl h-64 flex justify-center items-center">
              <CarouselComponent />
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl flex-grow flex justify-center items-center">
            <canvas ref={chartRef} style={{ maxWidth: '110%', maxHeight: '110%' }} />
          </div>
          <div className="bg-white p-4 rounded-xl flex justify-center">
            <div className="bg-blue-200 p-4 rounded-xl flex items-center justify-center text-center w-1/2 mx-4">
              <FaSun className="text-6xl text-yellow-500 mb-4 mr-4" />
              <div>
                <h3 className="text-2xl font-bold">Luminosidad</h3>
                <p className="text-lg">{luzData.length > 0 ? luzData[luzData.length - 1].luz : 'N/A'}</p>
              </div>
            </div>
            <div className="bg-yellow-200 p-4 rounded-xl flex items-center justify-center text-center w-1/2 mx-4">
              <FaTint className="text-6xl text-blue-500 mb-4 mr-4" />
              <div>
                <h3 className="text-2xl font-bold">Humedad</h3>
                <p className="text-lg">{humidityData.length > 0 ? humidityData[humidityData.length - 1].humedad : 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Últimos 10 datos de distancia:</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Fecha</th>
                  <th className="border px-4 py-2">Distancia</th>
                </tr>
              </thead>
              <tbody>
                {distanceData.slice(0, 10).map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.fecha}</td>
                    <td className="border px-4 py-2">{item.distancia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
