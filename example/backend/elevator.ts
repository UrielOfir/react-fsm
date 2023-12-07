import FSM from "../../src/fsm";
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

let currentFloor = 0;
let targetFloor = 0;
let callingFloor = 0;

let elevatorFSM = new FSM("idle");

// Define states
elevatorFSM.defineState("idle");
elevatorFSM.defineState("moving");
elevatorFSM.defineState("gotToFloor");

// Define transitions
elevatorFSM.defineTransition(
  "idle",
  "moving",
  "moveToCallingFloor",
  moveToCallingFloor
);
elevatorFSM.defineTransition(
  "moving",
  "gotToFloor",
  "arriveAtCallingFloor",
  arriveAtCallingFloor
);
elevatorFSM.defineTransition(
  "gotToFloor",
  "moving",
  "moveToTargetFloor",
  moveToTargetFloor
);
elevatorFSM.defineTransition(
  "moving",
  "gotToFloor",
  "arriveAtTargetFloor",
  arriveAtTargetFloor
);
elevatorFSM.defineTransition(
  "gotToFloor",
  "idle",
  "returnToIdle",
  returnToIdle
);

function moveToCallingFloor() {
  eventEmitter.emit(
    "updateClient",
    `Moving from floor ${currentFloor} to calling floor ${callingFloor}`
  );
  currentFloor = callingFloor;
  elevatorFSM.transition("arriveAtCallingFloor");
}

function arriveAtCallingFloor() {
  eventEmitter.emit("updateClient", JSON.stringify({ openDoorAt: currentFloor }));
  elevatorFSM.transition("moveToTargetFloor");
}

function moveToTargetFloor() {
  eventEmitter.emit(
    "updateClient",
    `Moving from floor ${currentFloor} to target floor ${targetFloor}`
  );
  currentFloor = targetFloor;
  elevatorFSM.transition("arriveAtTargetFloor");
}

function arriveAtTargetFloor() {
  eventEmitter.emit("updateClient", `Arrived at target floor ${targetFloor}`);
  elevatorFSM.transition("returnToIdle");
}

function returnToIdle() {
  eventEmitter.emit("updateClient", `Returning to idle state`);
}

const goToFloor = (call, target) => {
  callingFloor = call;
  targetFloor = target;
  elevatorFSM.transition("moveToCallingFloor");
};

function updateClient(ws) {
  eventEmitter.on("updateClient", (data) => {
    ws.send(data);
  });
}

export { elevatorFSM, goToFloor, updateClient };
