import FSM from "../../src/fsm";
import { checkIfEventAndElevatorSameDirection, delay } from "./utils";
import { eventEmitter } from "./server";
import {
  ElevatorEvent,
  ElevatorState,
} from "../frontend/src/sharedTypes/types";
import { Transition } from "./types";
const elevatorFSM = new FSM(ElevatorState.Idle);

const ELEVATOR_DELAY = 2000;

elevatorFSM.defineState(ElevatorState.Idle);
elevatorFSM.defineState(ElevatorState.MovingUp);
elevatorFSM.defineState(ElevatorState.MovingDown);

elevatorFSM.defineTransition(
  ElevatorState.Idle,
  ElevatorState.MovingUp,
  Transition.MoveUp
);
elevatorFSM.defineTransition(
  ElevatorState.Idle,
  ElevatorState.MovingDown,
  Transition.MoveDown
);
elevatorFSM.defineTransition(
  ElevatorState.MovingUp,
  ElevatorState.MovingDown,
  Transition.ChangeDirection
);
elevatorFSM.defineTransition(
  ElevatorState.MovingDown,
  ElevatorState.MovingUp,
  Transition.ChangeDirection
);
elevatorFSM.defineTransition(
  ElevatorState.MovingUp,
  ElevatorState.Idle,
  Transition.Stop
);
elevatorFSM.defineTransition(
  ElevatorState.MovingDown,
  ElevatorState.Idle,
  Transition.Stop
);

const elevatorEvents: ElevatorEvent[] = [];
let currentFloor = 0;
let isDoorOpen = false;

function goToFloor(callingFloor: number, targetFloor: number) {
  const event: ElevatorEvent = {
    callingFloor,
    targetFloor,
    direction:
      callingFloor < targetFloor
        ? ElevatorState.MovingUp
        : ElevatorState.MovingDown,
    handled: false,
  };

  elevatorEvents.push(event);

  const isElevatorIdle: boolean = elevatorFSM.getState() === ElevatorState.Idle;
  if (isElevatorIdle) {
    const transition =
      event.callingFloor >= currentFloor
        ? Transition.MoveUp
        : Transition.MoveDown;
    elevatorFSM.transition(transition);
    moveElevator();
  }
}

function updateReqsAndDoor() {
  const indexesToRemove: number[] = [];
  elevatorEvents.forEach((event) => {
    //conditions
    const isElevatorAtCallingFloor: boolean =
      event.callingFloor === currentFloor;
    const isElevatorAtTargetFloor: boolean = event.targetFloor === currentFloor;
    const isReqFromCurrentFloor: boolean =
      checkIfEventAndElevatorSameDirection(event, elevatorFSM) &&
      isElevatorAtCallingFloor;
    const finishedReq: boolean = isElevatorAtTargetFloor && event.handled;

    if (isReqFromCurrentFloor) {
      event.handled = true;
      isDoorOpen = true;
    }

    if (finishedReq) {
      indexesToRemove.push(elevatorEvents.indexOf(event));
      isDoorOpen = true;
    }
  });

  // remove finished requests
  indexesToRemove.reverse().forEach((index) => elevatorEvents.splice(index, 1));
}

function checkIfNeedToChangeDirection(): boolean {
  function isRelevantRequest(event: ElevatorEvent): boolean {
    const isPeekingInCurrentFloor: boolean =
      checkIfEventAndElevatorSameDirection(event, elevatorFSM) &&
      event.callingFloor === currentFloor &&
      !event.handled;

    const isReqInTheSameDirection: boolean =
      (elevatorFSM.getState() === ElevatorState.MovingDown
        ? event.targetFloor < currentFloor
        : event.targetFloor > currentFloor) && event.handled;

    const isReqForPeek: boolean =
      (elevatorFSM.getState() === ElevatorState.MovingDown
        ? event.callingFloor < currentFloor
        : event.callingFloor > currentFloor) && !event.handled;
    return isReqInTheSameDirection || isReqForPeek || isPeekingInCurrentFloor;
  }
  const noReqsForCurrentDirection: boolean = !elevatorEvents.some((request) =>
    isRelevantRequest(request)
  );
  return noReqsForCurrentDirection;
}

async function moveElevatorOneFloor() {
  if (elevatorFSM.getState() === ElevatorState.MovingUp) {
    await delay(ELEVATOR_DELAY);
    console.log(`Moving up to floor ${currentFloor + 1}`);
    currentFloor++;
  } else if (elevatorFSM.getState() === ElevatorState.MovingDown) {
    await delay(ELEVATOR_DELAY);
    console.log(`Moving down to floor ${currentFloor - 1}`);
    currentFloor--;
  }
}

//TODO: refactor this function to smaller functions
async function moveElevator() {
  console.log(`\n    Current floor: ${currentFloor}`);
  console.table(elevatorEvents);

  const isNeedToChangDirection = checkIfNeedToChangeDirection();
  if (isNeedToChangDirection) {
    elevatorFSM.transition(Transition.ChangeDirection);
  }
  console.log(`run updateReqsAndDoor`);
  updateReqsAndDoor();

  console.table(elevatorEvents);
  updateClient();

  // stop if no requests
  if (elevatorEvents.length === 0) {
    await delay(ELEVATOR_DELAY);
    elevatorFSM.transition(Transition.Stop);
    isDoorOpen = false;
    updateClient();
    return;
  }
  console.log(`isDoorOpen: ${isDoorOpen}`);
  isDoorOpen = false;
  await moveElevatorOneFloor();
  moveElevator();
}

function updateClient() {
  eventEmitter.emit(
    "updateClient",
    JSON.stringify({
      isDoorOpen,
      currentFloor,
      elevatorState: elevatorFSM.getState(),
    })
  );
}

export { elevatorFSM, goToFloor };
