import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Building from "./components/Building";

const ws = new WebSocket("ws://localhost:8080");

function App() {
  const [openDoorAt, setOpenDoorAt] = useState(1);

  useEffect(() => {
    ws.onopen = () => {
      ws.send("Hello from client!");
    };
    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        console.log("data", data);
        if (data?.openDoorAt) {
          setOpenDoorAt(data.openDoorAt);
          console.log("openDoorAt", data.openDoorAt);
        }
        return () => {
          ws.close();
        };
      } catch (error) {
        console.error("Error:", error);
      }
    };
  }, []);

  const elevatorCall = (callingFloor: number, targetFloor: number) => {
    axios
      .post("http://localhost:3001/goToFloor", {
        callingFloor,
        targetFloor,
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Building openDoorAt={openDoorAt} elevatorCall={elevatorCall} />
    </div>
  );
}

export default App;
