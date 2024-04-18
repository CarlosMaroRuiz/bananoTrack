import { useEffect, useState } from 'react';
import setupWebSocket from './socket';

const WeatherDataReceiver = () => {
  const [lastHumidity, setLastHumidity] = useState(null);
  const [lastTemperature, setLastTemperature] = useState(null);
  const [maxHumidity, setMaxHumidity] = useState(null);
  const [minHumidity, setMinHumidity] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [notificationCreated, setNotificationCreated] = useState(false);

  useEffect(() => {
    const fetchHumidityLimits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/clima/humedad', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const { humedad_max, humedad_min } = data.data[0];
          setMaxHumidity(humedad_max);
          setMinHumidity(humedad_min);
        }
      } catch (error) {
        console.error('Error al obtener los límites de humedad:', error);
      }
    };

    const fetchTemperatureLimits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/clima/temperatura', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const { temperatura_max, temperatura_min } = data.data[0];
          setMaxTemperature(temperatura_max);
          setMinTemperature(temperatura_min);
        }
      } catch (error) {
        console.error('Error al obtener los límites de temperatura:', error);
      }
    };

    fetchHumidityLimits();
    fetchTemperatureLimits();
  }, []);

  useEffect(() => {
    const ws = setupWebSocket((data) => {
      console.log('Datos recibidos del WebSocket:', data);
      setLastHumidity(data.humidity);
      setLastTemperature(data.temperature);
      
      if (data.temperature > maxTemperature) {
        createNotification('temperature', 'exceeded');
      } else if (data.temperature < minTemperature) {
        createNotification('temperature', 'below');
      }

      if (data.humidity > maxHumidity) {
        createNotification('humidity', 'exceeded');
      } else if (data.humidity < minHumidity) {
        createNotification('humidity', 'below');
      }
    });

    return () => {
      ws.close();
    };
  }, [maxTemperature, minTemperature, maxHumidity, minHumidity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCreated(false);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [notificationCreated]);

  const createNotification = (type, condition) => {
    let description = '';
    if (type === 'temperature') {
      description = `La temperatura se ha ${condition === 'exceeded' ? 'sobrepasado' : 'quedado por debajo'} de los límites establecidos.`;
    } else if (type === 'humidity') {
      description = `La humedad se ha ${condition === 'exceeded' ? 'sobrepasado' : 'quedado por debajo'} de los límites establecidos.`;
    }

    // Aquí se utiliza lastHumidity y lastTemperature en el mensaje de la notificación
    const notificationData = {
      tipo: type,
      description: description,
      lastHumidity: lastHumidity,
      lastTemperature: lastTemperature,
    };
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/notificaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(notificationData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Notificación creada:', responseData);
        setNotificationCreated(true);
      })
      .catch((error) => {
        console.error('Error al crear la notificación:', error);
      });
  };

  return null; // No necesitas renderizar nada en este componente
};

export default WeatherDataReceiver;
