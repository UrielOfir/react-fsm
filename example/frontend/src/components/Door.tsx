import React, { useState, useEffect } from "react";
import './Door.scss'

interface DoorProps {
  isDoorOpen: boolean;
  elevatorHere: boolean;
}

const Door: React.FC<DoorProps> = ({ isDoorOpen, elevatorHere }) => {
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
    // <div className="door elevator-here">
    <div className={doorClass}>
    </div>
  );
};

export default Door;
