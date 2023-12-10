import React, { useEffect, useState } from "react";
import "./App.scss";
import Building from "./components/Building";
import { elevatorCall } from "./services/apiServices";
import { initializeWebSocket } from "./services/webSocketService";
import { ElevatorState } from "./sharedTypes/types";

function App() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [elevatorState, setElevatorState] = useState(ElevatorState.Idle);
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  useEffect(() => {
    const ws = initializeWebSocket((data) => {
      try {
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
        if ("isDoorOpen" in data) {
          setIsDoorOpen(data.isDoorOpen);
        }

        return () => {
          ws.close();
        };
      } catch (error) {
        console.error("Error:", error);
      }
    });

    return () => {
      ws.close();
    };
  }, []);

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
