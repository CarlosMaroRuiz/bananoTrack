import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import CarouselComponent from '../../components/Carousel';
import setupWebSocket from '../../components/socket'; // Importa la función setupWebSocket

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const ws = setupWebSocket((data) => {
      // Recibe los datos del WebSocket y actualiza el estado
      console.log('Datos recibidos del WebSocket:', data);
      setTemperatureData(data);
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
              label: 'Temperature (°C)',
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
                text: 'Temperature (°C)',
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
