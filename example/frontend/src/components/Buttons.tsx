import React from 'react';

interface ButtonsProps {
  floorsAmount: number;
  floorNumber: number;
  elevatorCall: (callingFloor: number, targetFloor: number) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ floorsAmount, floorNumber, elevatorCall }) => {
  return (
    <div className='building'>
      {Array.from({ length: floorsAmount }, (_, i) => (
        <button 
          key={i} 
          disabled={floorNumber === i + 1}
          onClick={() => elevatorCall(floorNumber, i + 1)}
        >
          {`Floor ${i + 1}`}
        </button>
      ))}
    </div>
  );
};

export default Buttons;