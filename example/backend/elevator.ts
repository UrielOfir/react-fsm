import FSM from "../../src/fsm";
import { eventEmitter } from "./server";

const elevatorFSM = new FSM("idle");

enum Direction {
  MovingUp = "movingUp",
  MovingDown = "movingDown",
}

type ElevatorEvent = {
  callingFloor: number;
  targetFloor: number;
  direction: Direction;
  handled: boolean;
};

elevatorFSM.defineState("idle");
elevatorFSM.defineState("movingUp");
elevatorFSM.defineState("movingDown");

elevatorFSM.defineTransition("idle", Direction.MovingUp, "moveUp");
elevatorFSM.defineTransition("idle", Direction.MovingDown, "moveDown");
elevatorFSM.defineTransition(
  Direction.MovingUp,
  Direction.MovingDown,
  "changeDirection"
);
elevatorFSM.defineTransition(
  Direction.MovingDown,
  Direction.MovingUp,
  "changeDirection"
);
elevatorFSM.defineTransition(Direction.MovingUp, "idle", "stop");
elevatorFSM.defineTransition(Direction.MovingDown, "idle", "stop");

const elevatorEvents: ElevatorEvent[] = [];
let currentFloor = 0;
let isDoorOpen = false;

function goToFloor(callingFloor: number, targetFloor: number) {
  const request: ElevatorEvent = {
    callingFloor,
    targetFloor,
    direction:
      callingFloor < targetFloor ? Direction.MovingUp : Direction.MovingDown,
    handled: false,
  };

  elevatorEvents.push(request);

  if (elevatorFSM.getState() === "idle") {
    const transition =
      request.callingFloor >= currentFloor ? "moveUp" : "moveDown";
    elevatorFSM.transition(transition);
    moveElevator();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateReqsAndDoor() {
  const indexesToRemove: number[] = [];
  elevatorEvents.forEach((request) => {
    const isReqFromCurrentFloor: boolean =
      request.direction === elevatorFSM.getState() &&
      request.callingFloor === currentFloor;
    const finishedReq: boolean =
      request.targetFloor === currentFloor && request.handled;

    if (isReqFromCurrentFloor) {
      request.handled = true;
      isDoorOpen = true;
    }

    if (finishedReq) {
      indexesToRemove.push(elevatorEvents.indexOf(request));
      isDoorOpen = true;
    }
  });
  indexesToRemove.reverse().forEach((index) => elevatorEvents.splice(index, 1));
}

function checkIfNeedToChangeDirection(): boolean {
  function isRelevantRequest(request: ElevatorEvent): boolean {
    const elevatorState = elevatorFSM.getState();

    const isPeekingInCurrentFloor: boolean =
      request.direction === elevatorFSM.getState() &&
      request.callingFloor === currentFloor &&
      !request.handled;

    const isReqInTheSameDirection: boolean =
      (elevatorFSM.getState() === Direction.MovingDown
        ? request.targetFloor < currentFloor
        : request.targetFloor > currentFloor) && request.handled;

    const isReqForPeek: boolean =
      (elevatorFSM.getState() === Direction.MovingDown
        ? request.callingFloor < currentFloor
        : request.callingFloor > currentFloor) && !request.handled;
    return isReqInTheSameDirection || isReqForPeek || isPeekingInCurrentFloor;
  }
  const noReqsForCurrentDirection: boolean = !elevatorEvents.some((request) =>
    isRelevantRequest(request)
  );
  return noReqsForCurrentDirection;
}

const ELEVATOR_DELAY = 5000;

async function moveElevatorOneFloor() {
  if (elevatorFSM.getState() === Direction.MovingUp) {
    await delay(ELEVATOR_DELAY);
    console.log(`Moving up to floor ${currentFloor + 1}`);
    currentFloor++;
  } else if (elevatorFSM.getState() === Direction.MovingDown) {
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
    elevatorFSM.transition("changeDirection");
  }
  console.log(`run updateReqsAndDoor`);
  updateReqsAndDoor();

  console.table(elevatorEvents);
  updateClient();

  // stop if no requests
  if (elevatorEvents.length === 0) {
    await delay(ELEVATOR_DELAY);
    elevatorFSM.transition("stop");
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
