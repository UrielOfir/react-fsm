import Floor from './Floor';

interface BuildingProps {
    isDoorOpen: boolean;
    currentFloor: number;
    elevatorState: string;
    elevatorCall: (callingFloor: number, targetFloor: number) => void;
  }

const Building: React.FC<BuildingProps> = ({elevatorCall, elevatorState, isDoorOpen, currentFloor}) => {

  const floorsAmount = 5;

  return (
        <div className="building">
    {Array.from({ length: floorsAmount }, (_, i) => (
      <Floor
        key={i}
        floorsAmount={floorsAmount}
        floorNumber={i + 1}
        isDoorOpen={isDoorOpen}
        currentFloor={currentFloor}
        elevatorState={elevatorState}
        elevatorCall={elevatorCall}
      />
    )).reverse()}
  </div>
  );
};

export default Building;
