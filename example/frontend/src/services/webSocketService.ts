const WEBSOCKET_API_URL =  "ws://localhost:8080";//  for ubuntu docker: 'ws://172.17.0.1:8080'

export const initializeWebSocket = (onMessage: (data: any) => void) => {
    const ws = new WebSocket(WEBSOCKET_API_URL);
  
    ws.onopen = () => {
      ws.send("Hello from client!");
    };
  
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      onMessage(data);
    };
  
    return ws;
  };