import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import CarouselComponent from '../../components/Carousel';

// Dashboard.jsx
const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm'], // Cambia las etiquetas a las horas de medición
      datasets: [
        {
          label: 'Temperature (°C)', // Cambia la etiqueta a 'Temperature (°C)'
          data: [5, 7, 10, 15, 5], // Cambia los datos a las mediciones de temperatura
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    };

    if (chartRef.current) {
      // Si ya existe una instancia del gráfico, la destruimos
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: data,
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
              title: {
                display: true,
                text: 'Time',
              },
            },
          },
        },
      });
    }
  }, []);

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
          <div className="bg-white p-4 rounded-xl">
            <canvas ref={chartRef} />
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
