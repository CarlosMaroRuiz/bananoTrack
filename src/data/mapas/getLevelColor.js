/*
Esta funcion lo que nos permitira es
retorna el color de estilos de tailwind y 
un pequeno mensaje  de nivel de agua
*/

export const getLevelColorTemperature = (waterLevel) => {
    let waterLevelText = '';
    let waterLevelColor = '';

         if (waterLevel >= 80) {
            waterLevelText = 'Alto';
            waterLevelColor = 'bg-red-500';
          } else if (waterLevel < 45) {
            waterLevelText = 'Bajo';
            waterLevelColor = 'bg-blue-500';
          } else {
            waterLevelText = 'Normal';
          }

          return {waterLevelText,waterLevelColor}
}