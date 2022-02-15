import React, { useMemo, useState } from "react";
import "./styles/app.scss";
import StopWatch from "./StopWatch";
import Timer from "./Timer";
import WorldClock from "./WorldClock";

function App() {
  const [usingAppName, setUsingAppName] = useState("StopWatch");
  const [usingApp, setUsingApp] = useState();

  useMemo(() => {
    switch (usingAppName) {
      case "StopWatch":
        setUsingApp(<StopWatch />);
        break;
      case "Timer":
        setUsingApp(<Timer />);
        break;
      case "WorldClock":
        setUsingApp(<WorldClock />);
        break;
      default:
        break;
    }
  }, [usingAppName]);

  return (
    <div id="App">
      <h1 id="appTitle">Clock</h1>
      <div id="nav">
        <button onClick={() => setUsingAppName("StopWatch")}>Stop Watch</button>
        <button onClick={() => setUsingAppName("Timer")}>Timer</button>
        <button onClick={() => setUsingAppName("WorldClock")}>
          World Clock
        </button>
      </div>
      {usingApp}
    </div>
  );
}

export default App;
