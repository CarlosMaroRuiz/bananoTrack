import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Mapas = () => {
  const [humedadData, setHumedadData] = useState([]);
  const [temperaturaPromedio, setTemperaturaPromedio] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/racimos/humedad', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos de humedad');
        }
        const { data } = await response.json();
        setHumedadData(data);
      } catch (error) {
        console.error('Error al obtener los datos de humedad:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calcular el promedio de temperatura
    if (humedadData.length > 0) {
      const sum = humedadData.reduce((acc, curr) => acc + curr, 0);
      const average = sum / humedadData.length;
      setTemperaturaPromedio(average);
    }
  }, [humedadData]);

  // Función para obtener las enfermedades y recomendaciones según la temperatura
  const obtenerEnfermedadesYRecomendaciones = () => {
    let enfermedades = [];
    let recomendaciones = [];

    if (temperaturaPromedio >= 30) {
      // Temperatura alta
      enfermedades = [
        "Sigatoka Negra (Mycosphaerella fijiensis): Los ácaros del plátano son una plaga común en climas cálidos. Se alimentan de la savia de las hojas, lo que puede provocar el enrollamiento y decoloración de las mismas, afectando la capacidad de la planta para realizar la fotosíntesis.",
        "Antracnosis (Colletotrichum musae): Los trips son pequeños insectos que se alimentan de las hojas de los plátanos, causando manchas plateadas y deformaciones en las mismas. Suelen ser más problemáticos en climas cálidos."
      ];
      recomendaciones = [
        "Utiliza fungicidas específicos recomendados para el control de la Sigatoka Negra.",
        "Aplica los fungicidas de manera preventiva siguiendo las indicaciones de dosificación y frecuencia.",
        "Realiza prácticas de manejo integrado de plagas y enfermedades, como la eliminación de hojas infectadas y la rotación de cultivos para reducir la propagación del patógeno."
      ];
    } else {
      // Temperatura baja
      enfermedades = [
        "Pudrición del cuello (Fusarium oxysporum): La pudrición del cuello es una enfermedad fúngica que suele ser más común en climas fríos y húmedos. Afecta el sistema vascular de la planta, provocando marchitez y muerte de las hojas, así como pudrición en la base del tallo.",
        "Moko (Ralstonia solanacearum): La enfermedad del Moko es causada por una bacteria y se manifiesta como marchitez rápida de las hojas y pudrición de los tallos en condiciones frescas y húmedas. Puede llevar a la muerte de la planta si no se controla adecuadamente."
      ];
      recomendaciones = [
        "Aplica fungicidas sistémicos específicos para el control de Fusarium.",
        "Evita el exceso de riego y asegúrate de que el suelo tenga un buen drenaje para reducir la humedad y prevenir la propagación del hongo.",
        "Realiza la desinfección de herramientas y equipos para evitar la propagación del patógeno."
      ];
    }

    return { enfermedades, recomendaciones };
  };

  const { enfermedades, recomendaciones } = obtenerEnfermedadesYRecomendaciones();

  // URLs de las imágenes
  const imagenEnfermedades = 'https://mexico.infoagro.com/wp-content/uploads/2019/05/Sigatonka-negra.jpg';
  const imagenRecomendaciones = 'https://prod.senasica.gob.mx/ALERTAS/imagenes/noticias/55f73b80810f9.jpg';

  return (
    <div className="flex h-screen relative bg-gray-200">
      <Sidebar />
      <div className="flex-grow overflow-auto p-4 relative h-full">
        <Navbar />
        <div className="grid grid-cols-2 gap-4 mt-4 h-full">
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border">
            <h1>ENFERMEDADES O PLAGAS</h1>
            <img src={imagenEnfermedades} alt="Imagen de enfermedades o plagas" className="my-4" />
            <ul>
              {enfermedades.map((enfermedad, index) => (
                <li key={index}>{enfermedad}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center h-full border-blue-500 border">
            <h1>RECOMENDACIONES PARA NO SER AFECTADO MUCHO</h1>
            <img src={imagenRecomendaciones} alt="Imagen de recomendaciones" className="my-4" />
            <ul>
              {recomendaciones.map((recomendacion, index) => (
                <li key={index}>{recomendacion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapas;
