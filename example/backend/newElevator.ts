import FSM from "../../src/fsm";
import { eventEmitter } from "./server";

const elevatorFSM = new FSM("idle");

enum Direction {
  MovingUp = "movingUp",
  MovingDown = "movingDown",
}

type Request = {
  callingFloor: number;
  targetFloor: number;
  direction: Direction;
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

let requests: Request[] = [];
let currentFloor = 0;

function handleRequest(callingFloor: number, targetFloor: number) {
  const request: Request = {
    callingFloor,
    targetFloor,
    direction:
      callingFloor > targetFloor ? Direction.MovingUp : Direction.MovingDown,
  };
  requests.push(request);

  if (elevatorFSM.getState() === "idle") {
    elevatorFSM.transition(request.direction);
    moveElevator();
  }
}

function moveElevator() {
  if (elevatorFSM.getState() === Direction.MovingUp) {
    currentFloor++;
  } else if (elevatorFSM.getState() === Direction.MovingDown) {
    currentFloor--;
  }

  const index = requests.findIndex(
    (request: Request) =>
      request.callingFloor === currentFloor ||
      request.targetFloor === currentFloor
  );

  if (index !== -1) {
    const request = requests[index];
    if (currentFloor === request.targetFloor) {
      requests.splice(index, 1);
    }
  }

  if (requests.length === 0) {
    elevatorFSM.transition("stop");
  } else if (currentFloor === requests[requests.length - 1].callingFloor) {
    elevatorFSM.transition("changeDirection");
  }
}

handleRequest(3, 5);
handleRequest(5, 1);
handleRequest(1, 3);

export { elevatorFSM };
