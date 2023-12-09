import React, { useState, useEffect } from 'react';

interface DoorProps {
  isDoorOpen: boolean;
  elevatorHere: boolean;
}

const Door: React.FC<DoorProps> = ({ isDoorOpen, elevatorHere }) => {
  const [doorClass, setDoorClass] = useState('door');

  useEffect(() => {
    let newDoorClass = 'door';
    if (isDoorOpen && elevatorHere) {
      setDoorClass(doorClass + 'open');
    } else if (!isDoorOpen && elevatorHere) {
      newDoorClass += ' elevator-here';
    }
    setDoorClass(newDoorClass);
  }, [isDoorOpen, elevatorHere]);

  return (
    <div className={doorClass}>
      {`EH: ${elevatorHere} DO: ${isDoorOpen}
      class: ${doorClass}`}
    </div>
  );
};

export default Door;