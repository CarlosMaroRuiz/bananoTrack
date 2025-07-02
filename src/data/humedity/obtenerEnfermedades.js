  // Función para obtener las enfermedades y recomendaciones según la temperatura
export const obtenerEnfermedadesYRecomendaciones = (temperaturaPromedio) => {
    let enfermedades = [];
    let recomendaciones = [];

    if (temperaturaPromedio >= 30) {
      // Temperatura alta
      enfermedades = [
        "SIGATOKA NEGRA(Mycosphaerella fijiensis): Los ácaros del plátano son una plaga común en climas cálidos. Se alimentan de la savia de las hojas, lo que puede provocar el enrollamiento y decoloración de las mismas, afectando la capacidad de la planta para realizar la fotosíntesis.",
        "ANTRACNOSIS(Colletotrichum musae): Los trips son pequeños insectos que se alimentan de las hojas de los plátanos, causando manchas plateadas y deformaciones en las mismas. Suelen ser más problemáticos en climas cálidos."
      ];
      recomendaciones = [
        "Utiliza fungicidas específicos recomendados para el control de la Sigatoka Negra.",
        "Aplica los fungicidas de manera preventiva siguiendo las indicaciones de dosificación y frecuencia.",
        "Realiza prácticas de manejo integrado de plagas y enfermedades, como la eliminación de hojas infectadas y la rotación de cultivos para reducir la propagación del patógeno."
      ];
    } else {
      // Temperatura baja
      enfermedades = [
        "PUDRICIÓN DE CUELLO (Fusarium oxysporum): La pudrición del cuello es una enfermedad fúngica que suele ser más común en climas fríos y húmedos. Afecta el sistema vascular de la planta, provocando marchitez y muerte de las hojas, así como pudrición en la base del tallo.",
        "MOKO (Ralstonia solanacearum): La enfermedad del Moko es causada por una bacteria y se manifiesta como marchitez rápida de las hojas y pudrición de los tallos en condiciones frescas y húmedas. Puede llevar a la muerte de la planta si no se controla adecuadamente."
      ];
      recomendaciones = [
        "Aplica fungicidas sistémicos específicos para el control de Fusarium.",
        "Evita el exceso de riego y asegúrate de que el suelo tenga un buen drenaje para reducir la humedad y prevenir la propagación del hongo.",
        "Realiza la desinfección de herramientas y equipos para evitar la propagación del patógeno."
      ];
    }

    return { enfermedades, recomendaciones };
  };