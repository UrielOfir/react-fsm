export const initializeWebSocket = (onMessage: (data: any) => void) => {
    const ws = new WebSocket("ws://localhost:8080");
  
    ws.onopen = () => {
      ws.send("Hello from client!");
    };
  
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      onMessage(data);
    };
  
    return ws;
  };