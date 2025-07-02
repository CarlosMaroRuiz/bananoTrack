import { useState, useEffect } from 'react';
import { fetchHumedadData } from '../../services/humedad/humedadService';

/**
 * Hook personalizado para obtener y gestionar los datos de humedad
 * @returns {Object} Objeto con datos de humedad, estado de carga y error
 */
export const useHumedadData = () => {
  const [humedadData, setHumedadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
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

    loadData();
  }, []);

  return { humedadData, loading, error };
};