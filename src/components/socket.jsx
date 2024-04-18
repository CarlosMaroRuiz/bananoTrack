// websocket.js
const setupWebSocket = (setRacimos) => {
  const ws = new WebSocket('ws://localhost:4000');

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
    // Puedes intentar reconectar aquí si lo deseas
  };

  return ws;
};

export default setupWebSocket;
