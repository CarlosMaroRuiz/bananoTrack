
import { useMemo } from 'react';
import { calculateAverage } from '../../util/calcuteAverage';

import { obtenerColorNivel,obtenerTextoNivel,obtenerRecomendacionFertilizante } from '../../services/mapa/mapaService';

/**
 * Hook personalizado para calcular y procesar el nivel de agua
 * @param {Array} humedadData - Datos de humedad
 * @returns {Object} Información procesada sobre el nivel de agua
 */
export const useWaterLevel = (humedadData) => {
  return useMemo(() => {
    // Calcular el nivel de agua
    const waterLevel = humedadData.length > 0 ? calculateAverage(humedadData) : 0;
    
    // Obtener el color basado en el nivel
    const waterLevelColor = obtenerColorNivel(waterLevel);
    
    // Obtener el texto descriptivo
    const waterLevelText = obtenerTextoNivel(waterLevel);
    
    // Obtener la recomendación de fertilizante
    const recomendacion = obtenerRecomendacionFertilizante(waterLevel);

    return {
      waterLevel,
      waterLevelColor,
      waterLevelText,
      recomendacion
    };
  }, [humedadData]);
};