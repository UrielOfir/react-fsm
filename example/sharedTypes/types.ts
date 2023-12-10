export type ElevatorEvent = {
  callingFloor: number;
  targetFloor: number;
  direction: Direction;
  handled: boolean;
};

export enum Direction {
  MovingUp = "movingUp",
  MovingDown = "movingDown",
}
