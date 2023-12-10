export type ElevatorEvent = {
  callingFloor: number;
  targetFloor: number;
  direction: ElevatorState.MovingDown | ElevatorState.MovingUp;
  handled: boolean;
};

export enum ElevatorState {
    Idle = "idle",
    MovingUp = "movingUp",
    MovingDown = "movingDown"
}