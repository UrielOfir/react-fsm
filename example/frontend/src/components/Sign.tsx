import React from 'react';

interface SignProps {
  currentFloor: number;
  elevatorState: string;
  isDoorOpen: boolean;
}

const Sign: React.FC<SignProps> = ({ currentFloor, elevatorState , isDoorOpen}) => {
  return (
    <div>
      {`Current Floor: ${currentFloor}, Elevator State: ${elevatorState}, Door Open: ${isDoorOpen}`}
    </div>
  );
};

export default Sign;