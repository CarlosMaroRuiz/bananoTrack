import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Hooks personalizados

import { useWaterLevel } from '../hooks/mapas/useWaterLevel';
import { useHumedadDataInterval } from './../hooks/mapas/useHumedadDataInterval';

const Mapas = () => {
  // Obtenemos los datos de humedad con actualización cada 3 minutos
  const { humedadData, loading, error } = useHumedadDataInterval();
  
  // Procesamos el nivel de agua y obtenemos toda la información relacionada
  const { waterLevel, waterLevelColor, waterLevelText, recomendacion } = useWaterLevel(humedadData);

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        
        {loading && humedadData.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando datos...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4 h-full">
            <div className={`bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full ${waterLevelColor} border-blue-500 border`}>
              <h3 className="mb-4">PROBABILIDAD DE INUNDACIÓN</h3>
              <div className="h-60 w-60 rounded-full overflow-hidden relative">
                <div 
                  className="h-full w-full absolute bottom-0" 
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 255, 0.5)', 
                    height: `${(waterLevel / 100) * 100}%`, 
                    animation: 'waterEffect 2s infinite alternate' 
                  }}
                ></div>
              </div>
              <div className="text-white mt-4">{waterLevelText}</div>
              
              {waterLevelText === 'Alto' && (
                <div className="text-red-500 mt-2">¡Advertencia! Posible riesgo de inundación.</div>
              )}
              
              {waterLevelText === 'Bajo' && (
                <div className="text-blue-500 mt-2">Nivel de agua bajo, no hay riesgo de inundación.</div>
              )}
              
              {waterLevelText === 'Normal' && (
                <div className="text-yellow-500 mt-2">Nivel de agua normal, sin riesgo de inundación.</div>
              )}
            </div>
            
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border">
              <h3 className="mb-4">Recomendación de Fertilizante</h3>
              <div className="text-center">
                <p>{recomendacion}</p>
                <img 
                  src="https://www.ftepeyac.com.mx/wp-content/uploads/2021/06/Imagen-ultrasol-banano.jpg" 
                  alt="Fertilizante" 
                  className="mt-4 max-w-full" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes waterEffect {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-20px);
            }
          }
          .border-blue-500 {
            border-color: #3182ce;
          }
        `}
      </style>
    </div>
  );
};

export default Mapas;