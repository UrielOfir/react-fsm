import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Building from "./components/Building";

const ws = new WebSocket("ws://localhost:8080");

function App() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [elevatorState, setElevatorState] = useState("idle");
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  useEffect(() => {
    ws.onopen = () => {
      ws.send("Hello from client!");
    };
    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        console.log("data", data);
        if (data?.openDoorAt) {
          console.log("openDoorAt", data.openDoorAt);
        }

        if (data?.currentFloor) {
          setCurrentFloor(data.currentFloor);
        }

        if (data?.elevatorState) {
          setElevatorState(data.elevatorState);
        }
        if ('isDoorOpen' in data)  {
          setIsDoorOpen(data.isDoorOpen);
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
      <Building
        elevatorCall={elevatorCall}
        isDoorOpen={isDoorOpen}
        currentFloor={currentFloor}
        elevatorState={elevatorState}
      />
    </div>
  );
}

export default App;
