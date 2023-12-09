import React from "react";
import "./Sign.scss";

interface SignProps {
  currentFloor: number;
  elevatorState: string;
}

const Sign: React.FC<SignProps> = ({ currentFloor, elevatorState }) => {
  return (
    <div className="row-container">
      <div className={`elevator-state`}>{currentFloor}</div>
      <div className={`elevator-state ${elevatorState}`}>
        {elevatorState === "movingUp" && "↑"}
        {elevatorState === "movingDown" && "↓"}
      </div>
    </div>
  );
};

export default Sign;
