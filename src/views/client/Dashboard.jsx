import React from 'react';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        {' '}
        {/* Añadir la clase h-full aquí */}
        <div className="grid grid-rows-3 gap-4 h-full">
          {' '}
          {/* Añadir la clase h-full aquí */}
          {/* Primera fila con 3 columnas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-200 p-4">Columna 1</div>
            <div className="bg-gray-200 p-4">Columna 2</div>
            <div className="bg-gray-200 p-4">Columna 3</div>
          </div>
          {/* Segunda fila con 1 columna que abarca todo el ancho */}
          <div className="bg-gray-200 p-4">Columna 1</div>
          {/* Tercera fila con 2 columnas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 p-4">Columna 1</div>
            <div className="bg-gray-200 p-4">Columna 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
