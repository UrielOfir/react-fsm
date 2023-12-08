import express, { Request, Response } from "express";
import cors from "cors";
import { EventEmitter } from "events";
import WebSocket from 'ws';
export const eventEmitter = new EventEmitter();

import { elevatorFSM, goToFloor } from "./newElevator";


const app = express();
app.use(cors());

app.get("/state", (req: Request, res: Response) => {
  res.send({ state: elevatorFSM.getState() });
});

app.use(express.json());

const wss = new WebSocket.Server({ port: 8080 });

function updateClient(ws) {
  eventEmitter.on("updateClient", (data) => {
    ws.send(data);
  });
}

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
  });
  updateClient(ws);
});

app.post("/goToFloor", (req: Request, res: Response) => {
  const { callingFloor, targetFloor } = req.body;
  // TODO: go to floor
  goToFloor(callingFloor, targetFloor);
  res.send({ state: elevatorFSM.getState() });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

