import FSM from "../../src/fsm";
import { ElevatorEvent } from "../frontend/src/sharedTypes/types";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkIfEventAndElevatorSameDirection(event: ElevatorEvent, elevatorFSM: FSM) {
  return event.direction === elevatorFSM.getState();
}