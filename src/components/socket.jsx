const setupWebSocket = (setRacimos) => {
  let ws;

  const connectWebSocket = () => {
    ws = new WebSocket('ws://3.215.18.246:4000');

    ws.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setRacimos(data);
      } catch (error) {
        console.error('Error al analizar los datos del WebSocket:', error);
      }
    };

    ws.onclose = () => {
      console.log('Conexión cerrada con el servidor WebSocket');
      // Intentar reconectar después de 3 segundos
      setTimeout(() => {
        connectWebSocket();
      }, 3000);
    };
  };

  // Iniciar la conexión WebSocket
  connectWebSocket();

  return ws;
};

export default setupWebSocket;