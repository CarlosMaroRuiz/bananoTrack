//la funcion acepte un arreglo para poder calcular el promedio
export const calculateAverage = (arreglo) =>{
      const sum = arreglo.reduce((acc, curr) => acc + curr, 0);
      const average = sum / arreglo.length;
      return average
}