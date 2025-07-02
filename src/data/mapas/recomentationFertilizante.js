export const getRecomentationFertilizante = (waterLevel) => {
    if (waterLevel >= 80) {
      return 'En condiciones de alta humedad, es posible que desees evitar la aplicación de fertilizantes que puedan lixiviar fácilmente debido a la saturación del suelo. Por lo tanto, es recomendable no aplicar fertilizantes en este caso para prevenir la pérdida de nutrientes por el exceso de agua.';
    } else if (waterLevel < 40) {
      return 'En condiciones de baja humedad, es posible que desees aplicar fertilizantes que ayuden a estimular el crecimiento de los plátanos y compensar la posible falta de nutrientes en el suelo. Ejemplos de fertilizantes que podrías considerar incluyen aquellos con un alto contenido de nitrógeno, como la urea o el nitrato de amonio, que pueden ayudar a promover un crecimiento vigoroso de las plantas incluso en condiciones de baja humedad.';
    } else {
      return 'Para condiciones de humedad normal, podrías utilizar fertilizantes equilibrados que proporcionen una mezcla de nutrientes esenciales para el crecimiento de los plátanos. Algunos ejemplos podrían incluir fertilizantes NPK (nitrógeno, fósforo y potasio) con una proporción equilibrada, como un 10-10-10 o un 20-20-20.';
    }
  };