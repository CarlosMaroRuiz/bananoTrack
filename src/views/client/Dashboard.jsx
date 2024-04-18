import { useEffect, useRef, useState } from 'react';
import { FaSun, FaTint, FaFilePdf } from 'react-icons/fa'; // Importa FaFilePdf de FontAwesome
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import CarouselComponent from '../../components/Carousel';
import setupWebSocket from '../../components/socket'; // Importa la función setupWebSocket
import ReportGenerator from '../../components/reporte'; // Importa el componente ReportGenerator

const Dashboard = () => {
  const chartRef = useRef(null);
  const humidityChartRef = useRef(null); // Ref para la gráfica de humedad
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [luzData, setluzData] = useState([]);
  const [reportData] = useState([]); // Agrega el estado para los datos del reporte

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
    let chartInstance = null;
  
    if (chartRef.current && temperatureData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
  
      // Crea una nueva instancia de Chart si hay datos disponibles
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
      // Destruye la instancia de Chart en la función de limpieza
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [temperatureData]);
  
  useEffect(() => {
    let humidityChartInstance = null;
  
    if (humidityChartRef.current && humidityData.length > 0) {
      const ctx = humidityChartRef.current.getContext('2d');
  
      // Crea una nueva instancia de Chart si hay datos disponibles
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
      // Destruye la instancia de Chart en la función de limpieza
      if (humidityChartInstance) {
        humidityChartInstance.destroy();
      }
    };
  }, [humidityData]);
  

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
