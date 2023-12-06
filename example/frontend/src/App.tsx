import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState("1");
  const [levelsArray] = useState<string[]>(
    Array.from({ length: 5 }, (_, i) => `${i + 1}`)
  );

  useEffect(() => {
    fetch("http://localhost:3001/state")
      .then((response) => response.json())
      .then((data) => setState(data.state))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClick = (level: string) => {
    fetch("http://localhost:3001/transition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transition: `goTo${level}` }),
    })
      .then((response) => response.json())
      .then((data) => setState(data.state))
      .catch(error => console.error('Error:', error));;
  };

  return (
    <div className="building">
      {levelsArray.reverse().map((level) => (
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
