import React, { useEffect, useState } from "react";
import FSM from "./fsm";
import "./App.css";

function App() {
  const [fsm, setFsm] = useState<FSM | null>(null);
  const [state, setState] = useState("1");

  useEffect(() => {
    const myFsm = new FSM("1");
    ["1", "2", "3", "4", "5"].forEach(level => {
      myFsm.defineState(level);
    });
    ["1", "2", "3", "4", "5"].forEach(level1 => {
      ["1", "2", "3", "4", "5"].forEach(level2 => {
        if (level1 !== level2) {
          myFsm.defineTransition(level1, level2, `goTo${level2}`);
        }
      });
    });
    setFsm(myFsm);
  }, []);

  const handleClick = (level: string) => {
    if (fsm) {
      fsm.transition(`goTo${level}`);
      setState(fsm.getState());
    }
  };

  return (
    <div className="building">
      {["5", "4", "3", "2", "1"].map(level => (
        <div key={level} className="floor">
          <div className={`door ${state === level ? "open" : ""}`}>
            <button onClick={() => handleClick(level)}>
              {state === level ? "Elevator is here" : "Call Elevator"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;