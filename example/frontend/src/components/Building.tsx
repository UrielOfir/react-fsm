import React, { useState, useEffect } from "react";
import Floor from './Floor';

interface Level {
  id: number;
  name: string;
}

interface BuildingProps {
    isDoorOpen: boolean;
    currentFloor: number;
    elevatorState: string;
    elevatorCall: (callingFloor: number, targetFloor: number) => void;
  }

const Building: React.FC<BuildingProps> = ({elevatorCall, elevatorState, isDoorOpen, currentFloor}) => {
  const [state, setState] = useState<string | null>(null);
  const levelsArray: Level[] = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];

  const floorsAmount = 5;
  useEffect(() => {
  }, []);

  return (
        <div>
    {Array.from({ length: floorsAmount }, (_, i) => (
      <Floor
        key={i}
        floorsAmount={floorsAmount}
        floorNumber={i + 1}
        isDoorOpen={isDoorOpen}
        currentFloor={currentFloor}
        elevatorState={elevatorState}
      />
    )).reverse()}
  </div>
  );
};

export default Building;
