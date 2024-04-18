import { useEffect, useRef, useState } from 'react';
import { FaSun, FaTint } from 'react-icons/fa'; // Importa los íconos de FontAwesome
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import CarouselComponent from '../../components/Carousel';
import setupWebSocket from '../../components/socket'; // Importa la función setupWebSocket

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [luzData, setluzData] = useState([]);


  useEffect(() => {
    const ws = setupWebSocket((data) => {
      // Recibe los datos del WebSocket y actualiza el estado
      console.log('Datos recibidos del WebSocket:', data);
      setTemperatureData(data);
      setHumidityData(data);
      setluzData(data);
    });

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && temperatureData.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: temperatureData.map(item => item.fecha), // Utiliza las fechas como etiquetas en el eje x
          datasets: [
            {
              label: 'Temperatura (°C)',
              data: temperatureData.map(item => item.temperatura), // Utiliza los datos de temperatura
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
              display: false, // Oculta completamente el eje x
            },
          },
        },
      });
    }
  }, [temperatureData]);

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        <div className="grid grid-rows-3 gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="bg-white p-4 rounded-xl h-64">Columna 1</div>
            <div className="bg-white p-4 rounded-xl h-64">Columna 2</div>
            <div className="bg-white p-4 rounded-xl h-64">
              <CarouselComponent />
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl flex-grow" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0', width: '100%' }}>
  <canvas ref={chartRef} style={{ maxWidth: '110%', maxHeight: '110%' }} />
</div>
<div className="bg-white p-4 rounded-xl flex justify-center">
  <div className="bg-blue-200 p-4 rounded-xl flex items-center justify-center text-center w-1/2 mx-4">
    <FaSun className="text-6xl text-yellow-500 mb-4 mr-4" /> {/* Ícono de Luz */}
    <div>
      <h3 className="text-2xl font-bold">Luminosidad</h3>
      <p className="text-lg">{luzData.length > 0 ? luzData[luzData.length - 1].luz : 'N/A'}</p>
    </div>
  </div>
  <div className="bg-yellow-200 p-4 rounded-xl flex items-center justify-center text-center w-1/2 mx-4">
    <FaTint className="text-6xl text-blue-500 mb-4 mr-4" /> {/* Ícono de Gotas de Agua */}
    <div>
      <h3 className="text-2xl font-bold">Humedad</h3>
      <p className="text-lg">{humidityData.length > 0 ? humidityData[humidityData.length - 1].humedad : 'N/A'}</p>
    </div>
  </div>
</div>





        </div>
      </div>
    </div>
  );
};

export default Dashboard;
