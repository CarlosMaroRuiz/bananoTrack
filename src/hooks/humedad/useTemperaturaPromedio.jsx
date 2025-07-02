import { useState, useEffect } from 'react';
import { calculateAverage } from '../../util/calcuteAverage';

/**
 * Hook personalizado para calcular la temperatura promedio
 * @param {Array} humedadData - Datos de humedad
 * @returns {number} Temperatura promedio calculada
 */
export const useTemperaturaPromedio = (humedadData) => {
  const [temperaturaPromedio, setTemperaturaPromedio] = useState(0);

  useEffect(() => {
    if (humedadData.length > 0) {
      const average = calculateAverage(humedadData);
      setTemperaturaPromedio(average);
    }
  }, [humedadData]);

  return temperaturaPromedio;
};