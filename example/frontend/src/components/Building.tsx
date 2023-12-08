import React, { useState, useEffect } from "react";

interface Level {
  id: number;
  name: string;
}

interface BuildingProps {
    openDoorAt: number | null;
    elevatorCall: (callingFloor: number, targetFloor: number) => void;
  }

const Building: React.FC<BuildingProps> = ({elevatorCall, openDoorAt}) => {
  const [state, setState] = useState<string | null>(null);
  const levelsArray: Level[] = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];
  useEffect(() => {
    elevatorCall(2, 5);
  }, []);

  return (
    <div className="building">
        <div> hi {openDoorAt}</div>
      {levelsArray.reverse().map((level: Level) => (
        <div key={level.id} className="floor">
          <div className={`door ${state === level.name ? "open" : ""}`}>
            {state === level.name ? "Elevator is here" : `Floor ${level.name}`}
            {levelsArray.map((destination: Level) => (
              <button
                key={destination.id}
                onClick={() => elevatorCall(Number(level.name) , Number(destination.name))}
                disabled={level.name === destination.name}
              >
                {state === level.name
                  ? "Elevator is here"
                  : `${destination.name}`}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Building;
