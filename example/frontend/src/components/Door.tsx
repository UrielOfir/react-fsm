import React from 'react';

interface DoorProps {
  isDoorOpen: boolean;
  elevatorHere: boolean;
}

const Door: React.FC<DoorProps> = ({ isDoorOpen, elevatorHere }) => {
  let doorClass = 'door';
  if (isDoorOpen && elevatorHere) {
    doorClass += ' open';
  } else if (!isDoorOpen && elevatorHere) {
    doorClass += ' elevator-here';
  }

  return (
    <div className={`${doorClass}`}>
      {isDoorOpen ? "The door is open" : "The door is closed"}
    </div>
  );
};

export default Door;