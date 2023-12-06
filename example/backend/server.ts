import express, { Request, Response } from 'express';
import cors from 'cors';
import FSM from '../../src/fsm';

const app = express();
app.use(cors());
const port = 3001;
const levelsArray = Array.from({ length: 5 }, (_, i) => `${i + 1}`);

let myFsm = new FSM("1");
levelsArray.forEach(level => {
  myFsm.defineState(level);
});
levelsArray.forEach(level1 => {
  levelsArray.forEach(level2 => {
    if (level1 !== level2) {
      myFsm.defineTransition(level1, level2, `goTo${level2}`);
    }
  });
});

app.get('/state', (req: Request, res: Response) => {
  res.send({ state: myFsm.getState() });
});

app.use(express.json());

app.post('/transition', (req: Request, res: Response) => {
  console.log(req.body);
  const { transition } = req.body;
  myFsm.transition(transition);
  res.send({ state: myFsm.getState() });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});