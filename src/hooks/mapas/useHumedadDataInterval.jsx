import { useState, useEffect } from 'react';
import { fetchHumedadData } from '../../services/humedad/humedadService';

/**
 * Hook personalizado para obtener datos de humedad con actualización periódica
 * @param {number} intervalTime - Tiempo de intervalo en milisegundos (por defecto 3 minutos)
 * @returns {Object} Objeto con datos de humedad, estado de carga y error
 */
export const useHumedadDataInterval = (intervalTime = 3 * 60 * 1000) => {
  const [humedadData, setHumedadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHumedadData();
        setHumedadData(data);
        setError(null);
      } catch (err) {
        console.error('Error al obtener los datos de humedad:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Realizar la primera carga de datos
    fetchData();

    // Configurar el intervalo para actualizaciones periódicas
    const intervalId = setInterval(fetchData, intervalTime);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [intervalTime]);

  return { humedadData, loading, error };
};