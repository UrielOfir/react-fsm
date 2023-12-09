import React from 'react';

interface ButtonsProps {
  floorsAmount: number;
  floorNumber: number;
}

const Buttons: React.FC<ButtonsProps> = ({ floorsAmount, floorNumber }) => {
  return (
    <div>
      {Array.from({ length: floorsAmount }, (_, i) => (
        <button key={i} disabled={floorNumber === i + 1}>
          {`Floor ${i + 1}`}
        </button>
      ))}
    </div>
  );
};

export default Buttons;