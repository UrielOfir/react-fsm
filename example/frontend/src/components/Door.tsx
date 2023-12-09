import React, { useState, useEffect } from "react";
import './Door.scss'
import Sign from "./Sign";

interface DoorProps {
  isDoorOpen: boolean;
  elevatorHere: boolean;
  currentFloor: number;
  elevatorState: string;
}

const Door: React.FC<DoorProps> = ({ isDoorOpen, elevatorHere , elevatorState, currentFloor}) => {
  const [doorClass, setDoorClass] = useState("door");

  useEffect(() => {
    let newDoorClass = "door";
    if (isDoorOpen && elevatorHere) {
      newDoorClass += " open";
    } else if (!isDoorOpen && elevatorHere) {
      newDoorClass += " elevator-here";
    }
    setDoorClass(newDoorClass);
  }, [isDoorOpen, elevatorHere]);

  return (
<div>
<div className="row-container">
        <Sign
          currentFloor={currentFloor}
          elevatorState={elevatorState}
        />
      </div>
    <div className={doorClass}>
    </div>
    </div>
  );
};

export default Door;
