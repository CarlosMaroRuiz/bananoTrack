import  { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Mapas = () => {
  const [humedadData, setHumedadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/racimos/humedad', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos de temperatura');
        }
        const { data } = await response.json();
        setHumedadData(data);
      } catch (error) {
        console.error('Error al obtener los datos de temperatura:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3 * 60 * 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const calculateWaterLevel = () => {
    if (humedadData.length > 0) {
      const sum = humedadData.reduce((acc, curr) => acc + curr, 0);
      const average = sum / humedadData.length;
      return average; // Retorna el nivel de agua como el promedio de temperatura
    }
    return 0; // Valor por defecto
  };

  const waterLevel = calculateWaterLevel();
  let waterLevelText, waterLevelColor;

  if (waterLevel >= 80) {
    waterLevelText = 'Alto';
    waterLevelColor = 'bg-red-500';
  } else if (waterLevel < 45) {
    waterLevelText = 'Bajo';
    waterLevelColor = 'bg-blue-500';
  } else {
    waterLevelText = 'Normal';
  }

  const recomendacionFertilizante = (waterLevel) => {
    if (waterLevel >= 80) {
      return 'En condiciones de alta humedad, es posible que desees evitar la aplicación de fertilizantes que puedan lixiviar fácilmente debido a la saturación del suelo. Por lo tanto, es recomendable no aplicar fertilizantes en este caso para prevenir la pérdida de nutrientes por el exceso de agua.';
    } else if (waterLevel < 40) {
      return 'En condiciones de baja humedad, es posible que desees aplicar fertilizantes que ayuden a estimular el crecimiento de los plátanos y compensar la posible falta de nutrientes en el suelo. Ejemplos de fertilizantes que podrías considerar incluyen aquellos con un alto contenido de nitrógeno, como la urea o el nitrato de amonio, que pueden ayudar a promover un crecimiento vigoroso de las plantas incluso en condiciones de baja humedad.';
    } else {
      return 'Para condiciones de humedad normal, podrías utilizar fertilizantes equilibrados que proporcionen una mezcla de nutrientes esenciales para el crecimiento de los plátanos. Algunos ejemplos podrían incluir fertilizantes NPK (nitrógeno, fósforo y potasio) con una proporción equilibrada, como un 10-10-10 o un 20-20-20.';
    }
  };

  const recomendacion = recomendacionFertilizante(waterLevel);

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        <div className="grid grid-cols-2 gap-4 mt-4 h-full">
          <div className={`bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full ${waterLevelColor}  border-blue-500 border`}>
            <h3 className="mb-4">PROBABILIDAD DE INUNDACIÓN</h3>
            <div className="h-60 w-60 rounded-full overflow-hidden relative">
              <div className="h-full w-full absolute bottom-0" style={{ backgroundColor: 'rgba(0, 0, 255, 0.5)', height: `${(waterLevel / 100) * 100}%`, animation: 'waterEffect 2s infinite alternate' }}></div>
            </div>
            <div className="text-white mt-4">{waterLevelText}</div>
            {waterLevelText === 'Alto' && <div className="text-red-500 mt-2">¡Advertencia! Posible riesgo de inundación.</div>}
            {waterLevelText === 'Bajo' && <div className="text-blue-500 mt-2">Nivel de agua bajo, no hay riesgo de inundación.</div>}
            {waterLevelText === 'Normal' && <div className="text-yellow-500 mt-2">Nivel de agua normal, sin riesgo de inundación.</div>}
          </div>
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border">
            <h3 className="mb-4">Recomendación de Fertilizante</h3>
            <div className="text-center">
              <p>{recomendacion}</p>
              {/* Agregar imagen de fertilizante desde una URL */}
              <img src="https://www.ftepeyac.com.mx/wp-content/uploads/2021/06/Imagen-ultrasol-banano.jpg" alt="Fertilizante" className="mt-4 max-w-full" />
            </div>
          </div>
        </div>
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
