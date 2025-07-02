// services/humedadService.js

/**
 * Obtiene los datos de humedad desde la API
 * @returns {Promise<Array>} Datos de humedad
 */
export const fetchHumedadData = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://3.215.18.246:3000/racimos/humedad', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los datos de humedad');
    }
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de humedad:', error);
    throw error;
  }
};