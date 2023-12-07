import express, { Request, Response } from 'express';
import cors from 'cors';
import FSM from '../../src/fsm';

const app = express();
app.use(cors());

let currentFloor = 0;
let targetFloor = 0;
let callingFloor = 0;

let elevatorFSM = new FSM("idle");

// Define states
elevatorFSM.defineState("idle");
elevatorFSM.defineState("moving");
elevatorFSM.defineState("gotToFloor");

// Define transitions
elevatorFSM.defineTransition("idle", "moving", "moveToCallingFloor", moveToCallingFloor);
elevatorFSM.defineTransition("moving", "gotToFloor", "arriveAtCallingFloor", arriveAtCallingFloor);
elevatorFSM.defineTransition("gotToFloor", "moving", "moveToTargetFloor", moveToTargetFloor);
elevatorFSM.defineTransition("moving", "gotToFloor", "arriveAtTargetFloor", arriveAtTargetFloor);
elevatorFSM.defineTransition("gotToFloor", "idle", "returnToIdle", returnToIdle);

function moveToCallingFloor() {
  console.log(`Moving from floor ${currentFloor} to calling floor ${callingFloor}`);
  currentFloor = callingFloor;
  elevatorFSM.transition("arriveAtCallingFloor");
}

function arriveAtCallingFloor() {
  console.log(`Arrived at calling floor ${callingFloor}`);
  elevatorFSM.transition("moveToTargetFloor");
}

function moveToTargetFloor() {
  console.log(`Moving from floor ${currentFloor} to target floor ${targetFloor}`);
  currentFloor = targetFloor;
  elevatorFSM.transition("arriveAtTargetFloor");
}

function arriveAtTargetFloor() {
  console.log(`Arrived at target floor ${targetFloor}`);
  elevatorFSM.transition("returnToIdle");
}

function returnToIdle() {
  console.log(`Returning to idle state`);
}

app.get('/state', (req: Request, res: Response) => {
  res.send({ state: elevatorFSM.getState() });
});

app.use(express.json());

app.post('/goToFloor', (req: Request, res: Response) => {
  ({ targetFloor, callingFloor } = req.body);
  if (elevatorFSM.getState() === "idle") {
    elevatorFSM.transition("moveToCallingFloor");
  }  res.send({ state: elevatorFSM.getState() });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});