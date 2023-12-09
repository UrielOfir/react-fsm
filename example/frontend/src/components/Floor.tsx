import React from 'react';
import Door from './Door';
import Buttons from './Buttons';
import Sign from './Sign';

interface FloorProps {
  floorsAmount: number;
  floorNumber: number;
  isDoorOpen: boolean;
  currentFloor: number;
  elevatorState: string;
}

const Floor: React.FC<FloorProps> = ({ floorsAmount, floorNumber, isDoorOpen, currentFloor, elevatorState }) => {
  return (
    <div className='floor'>
      <Door isDoorOpen={isDoorOpen } elevatorHere={floorNumber===currentFloor} />
      <Buttons floorsAmount={floorsAmount} floorNumber={floorNumber} />
      <Sign currentFloor={currentFloor} elevatorState={elevatorState} isDoorOpen={isDoorOpen}/>
    </div>
  );
};

export default Floor;