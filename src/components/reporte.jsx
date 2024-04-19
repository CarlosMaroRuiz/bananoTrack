import { useState, useEffect } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { pdf, StyleSheet, Text, View, Page, Document } from '@react-pdf/renderer';

const CombinedComponent = () => {
  const [ranchoData, setRanchoData] = useState({});
  const [fecha, setFecha] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [luminosidad, setLuminosidad] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const temperaturaResponse = await fetch('http://3.215.18.246:3000/racimos/temperatura', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const humedadResponse = await fetch('http://3.215.18.246:3000/racimos/humedad', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const luminosidadResponse = await fetch('http://3.215.18.246:3000/racimos/luz', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const temperaturaData = await temperaturaResponse.json();
        const humedadData = await humedadResponse.json();
        const luminosidadData = await luminosidadResponse.json();

        const ultimoTemperatura = temperaturaData.data[temperaturaData.data.length - 1];
        const ultimoHumedad = humedadData.data[humedadData.data.length - 1];
        const ultimoLuminosidad = luminosidadData.data[luminosidadData.data.length - 1];

        const ultimoDigitoTiempo = ultimoTemperatura.toString().slice(-1);
        const diasEstimados = calcularDiasEstimados(ultimoDigitoTiempo, ultimoHumedad, ultimoLuminosidad);

        setRanchoData({
          nombre: 'Finca El Paraíso',
          ubicacion: 'Nuevo Nicapa, Pichucalco, Chiapas'
        });
        setFecha(new Date().toLocaleDateString());
        setTemperatura(ultimoTemperatura); // Solo el último valor de temperatura
        setHumedad(ultimoHumedad); // Solo el último valor de humedad
        setLuminosidad(ultimoLuminosidad); // Solo el último valor de luminosidad
        setTiempoEstimado(diasEstimados);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const calcularDiasEstimados = (temperatura, humedad, luminosidad) => {
    let diasEstimados = 0;
    const ultimoDigitoTiempo = temperatura.toString().slice(-1);

    if (temperatura > 35 || humedad > 80 || luminosidad > 60) {
      diasEstimados = 50 + parseInt(ultimoDigitoTiempo); // Condiciones extremadamente altas
    } else if (temperatura < 20 || humedad < 40 || luminosidad < 20) {
      diasEstimados = 110 + parseInt(ultimoDigitoTiempo); // Condiciones extremadamente bajas
    } else {
      diasEstimados = 90 + parseInt(ultimoDigitoTiempo); // Condiciones normales
    }

    return diasEstimados;
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
      backgroundColor: 'white', 
    },
    section: {
      marginVertical: 20,
      fontSize: 12,
      textAlign: 'center',
      color: 'black', // Color de texto negro por defecto
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: 'blue', // Color de título azul
    },
    boldText: {
      fontSize: 16, 
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'green', // Color de texto en negrita verde
    },
    italicText: {
      fontStyle: 'italic',
      marginBottom: 15,
      color: 'purple', // Color de texto en cursiva morado
    },
    watermark: {
      position: 'absolute',
      fontSize: 100,
      opacity: 0.1,
      zIndex: 0,
      transform: 'rotate(-45deg)',
      color: 'gray', // Color de marca de agua gris
    },
  });
  
  const generatePDF = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Finca El Paraíso</Text>
            <View style={styles.section}>
              <Text style={styles.subtitle}>Reporte de Maduración de Bananos</Text>
              <Text style={styles.text}>Nombre del Rancho: {ranchoData.nombre}</Text>
              <Text style={styles.text}>Ubicación: {ranchoData.ubicacion}</Text>
              <Text style={styles.text}>Fecha: {fecha}</Text>
              <Text style={styles.text}>Temperatura (°C): {temperatura}</Text>
              {/* Solo se muestra el último valor de temperatura */}
              <Text style={styles.text}>Humedad (%): {humedad}</Text>
              <Text style={styles.text}>Luminosidad: {luminosidad}</Text>
              <Text style={styles.text}>Tiempo estimado de maduración (días): {tiempoEstimado}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.subtitle}>Análisis de Datos:</Text>
              <Text style={styles.text}>
                Los datos recopilados muestran condiciones ambientales favorables para la maduración de los bananos en la finca.
                La temperatura promedio registrada es de {temperatura}°C, con una humedad relativa del {humedad}% y niveles de luminosidad adecuados.
                Estas condiciones indican un ambiente propicio para la maduración en un período estimado de {tiempoEstimado} días.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.subtitle}>Recomendaciones:</Text>
              <Text style={styles.text}>
                Se recomienda monitorear continuamente las condiciones ambientales y realizar ajustes en la ventilación y el riego según sea necesario.
                Además, es crucial mantener un control estricto sobre posibles plagas y enfermedades que puedan afectar la calidad de los bananos durante su maduración.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    try {
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <div>
      <MdFileDownload size={30} onClick={generatePDF} />
    </div>
  );
};

export default CombinedComponent;
