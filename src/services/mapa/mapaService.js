import { getRecomentationFertilizante } from '../../data/mapas/recomentationFertilizante';
import { getLevelColorTemperature } from '../../data/mapas/getLevelColor';


/**
 * Obtiene la recomendación de fertilizante basada en el nivel de agua
 * @param {number} waterLevel - Nivel de agua calculado
 * @returns {string} Recomendación de fertilizante
 */
export const obtenerRecomendacionFertilizante = (waterLevel) => {
  return getRecomentationFertilizante(waterLevel);
};

/**
 * Obtiene el color de nivel basado en la temperatura
 * @param {number} waterLevel - Nivel de agua calculado
 * @returns {string} Clase CSS para el color del nivel
 */
export const obtenerColorNivel = (waterLevel) => {
  return getLevelColorTemperature(waterLevel);
};

/**
 * Obtiene el texto descriptivo del nivel de agua
 * @param {number} waterLevel - Nivel de agua calculado
 * @returns {string} Texto descriptivo del nivel
 */
export const obtenerTextoNivel = (waterLevel) => {
  // Determine water level text based on the value
  if (waterLevel > 70) {
    return 'Alto';
  } else if (waterLevel < 30) {
    return 'Bajo';
  } else {
    return 'Normal';
  }
};