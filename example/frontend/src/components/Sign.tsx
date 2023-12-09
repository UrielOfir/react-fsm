import React from 'react';

interface SignProps {
  currentFloor: number;
  elevatorState: string;
}

const Sign: React.FC<SignProps> = ({ currentFloor, elevatorState}) => {
  return (
    <div className='row-container'>
      {`Current Floor: ${currentFloor}`}
      <div className={`elevator-state ${elevatorState}`}>
        {elevatorState === 'movingUp' && '↑'}
        {elevatorState === 'movingDown' && '↓'}
      </div>
    </div>
  );
};

export default Sign;