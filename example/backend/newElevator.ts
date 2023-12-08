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

const requests: ElevatorEvent[] = [];
let currentFloor = 0;

function goToFloor(callingFloor: number, targetFloor: number) {
  const request: ElevatorEvent = {
    callingFloor,
    targetFloor,
    direction:
      callingFloor < targetFloor ? Direction.MovingUp : Direction.MovingDown,
    handled: false,
  };

  requests.push(request);

  if (elevatorFSM.getState() === "idle") {
    if (callingFloor === currentFloor) {
      request.handled = true;
      openDoor(request);
    }
    const transition =
      request.direction == Direction.MovingUp ? "moveUp" : "moveDown";
    elevatorFSM.transition(transition);
    moveElevator();
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moveElevator() {
  if (elevatorFSM.getState() === Direction.MovingUp) {
    await delay(1000);
    console.log(`Moving up to floor ${currentFloor + 1}`);
    currentFloor++;
  } else if (elevatorFSM.getState() === Direction.MovingDown) {
    await delay(1000);
    console.log(`Moving down to floor ${currentFloor - 1}`);
    currentFloor--;
  }

  // handle requests
  requests.forEach((request) => {
    const reqFromCurrentFloor: boolean =
      request.direction === elevatorFSM.getState() &&
      request.callingFloor === currentFloor;
    const finishedReq: boolean =
      request.targetFloor === currentFloor && request.handled;

    if (reqFromCurrentFloor) {
      request.handled = true;
      openDoor(request);
    }

    if (finishedReq) {
      requests.splice(requests.indexOf(request), 1);
      openDoor(request);
    }
  });

  // update elevator state
  if (requests.length === 0) {
    elevatorFSM.transition("stop");
    return;
  }

  function isRelevantRequest(request: ElevatorEvent): boolean {
    return (
      (elevatorFSM.getState() === Direction.MovingDown
        ? request.callingFloor <= currentFloor
        : request.callingFloor >= currentFloor) || request.handled
    );
  }
  const noReqsForCurrentDirection: boolean = !requests.some((request) =>
    isRelevantRequest(request)
  );
  if (noReqsForCurrentDirection) {
    elevatorFSM.transition("changeDirection");
  }

  moveElevator();
}

function openDoor(req?: ElevatorEvent) {
  console.log(
    `Opening door at floor ${currentFloor} for req ${JSON.stringify(req)}`
  );
  eventEmitter.emit(
    "updateClient",
    JSON.stringify({ openDoorAt: currentFloor })
  );
}

export { elevatorFSM, goToFloor };
