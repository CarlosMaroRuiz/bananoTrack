import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Hooks personalizados
import { useHumedadData } from '../hooks/humedad/useHumedadData';
import { useTemperaturaPromedio } from '../hooks/humedad/useTemperaturaPromedio';

// Servicios
import { obtenerEnfermedadesYRecomendaciones } from '../data/humedity/obtenerEnfermedades';

// Importaciones de imágenes compartidas
import { imagenEnfermedades, imagenRecomendaciones } from '../shared/imagesShared';

const Humedad = () => {
  const { humedadData, loading, error } = useHumedadData();
  const temperaturaPromedio = useTemperaturaPromedio(humedadData);
  

  const { enfermedades, recomendaciones } = obtenerEnfermedadesYRecomendaciones(temperaturaPromedio);

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando datos...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4 h-full">
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border shadow-lg">
              <h1 className="text-3xl mb-4">ENFERMEDADES O PLAGAS</h1>
              <img src={imagenEnfermedades} alt="Imagen de enfermedades o plagas" className="my-4 max-w-full" />
              <ul className="text-justify">
                {enfermedades.map((enfermedad, index) => (
                  <li key={index}>{enfermedad}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border shadow-lg">
              <h1 className="text-3xl mb-4">RECOMENDACIONES</h1>
              <img src={imagenRecomendaciones} alt="Imagen de recomendaciones" className="my-4 max-w-full" />
              <ul className="text-justify">
                {recomendaciones.map((recomendacion, index) => (
                  <li key={index}>{recomendacion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Humedad;