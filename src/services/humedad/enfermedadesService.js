import { obtenerEnfermedadesYRecomendaciones as obtenerDatos } from '../../data/humedity/obtenerEnfermedades';

/**
 * Obtiene las enfermedades y recomendaciones basadas en la temperatura promedio
 * @param {number} temperaturaPromedio - Temperatura promedio calculada
 * @returns {Object} Objeto con arrays de enfermedades y recomendaciones
 */
export const obtenerEnfermedadesYRecomendaciones = (temperaturaPromedio) => {
  // Usamos la función original pero ahora desde un servicio
  return obtenerDatos(temperaturaPromedio);
};