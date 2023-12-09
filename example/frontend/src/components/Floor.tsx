import React from "react";
import Door from "./Door";
import Buttons from "./Buttons";
import Sign from "./Sign";

interface FloorProps {
  floorsAmount: number;
  floorNumber: number;
  isDoorOpen: boolean;
  currentFloor: number;
  elevatorState: string;
  elevatorCall: (callingFloor: number, targetFloor: number) => void;
}

const Floor: React.FC<FloorProps> = ({
  floorsAmount,
  floorNumber,
  isDoorOpen,
  currentFloor,
  elevatorState,
  elevatorCall,
}) => {
  return (
    <div className="floor">
      <div className="row-container">
        <Sign
          currentFloor={currentFloor}
          elevatorState={elevatorState}
        />
      </div>{" "}
      <div className="row-container">
        <Door
          isDoorOpen={isDoorOpen}
          elevatorHere={floorNumber === currentFloor}
        />
        <Buttons
          floorsAmount={floorsAmount}
          floorNumber={floorNumber}
          elevatorCall={elevatorCall}
        />
      </div>
    </div>
  );
};

export default Floor;
