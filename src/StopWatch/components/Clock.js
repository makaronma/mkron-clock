import React from "react";
import { getDisplayTime } from "../../utils";

const Clock = ({ ms, lapMs, overrideStyle }) => {
  const msDeg = (ms / 60000) * 360 - 90;
  const lapMsDeg = (lapMs / 60000) * 360 - 90;
  const mmDeg = (ms / 60000 / 60) * 360 - 90;
  return (
    <div id="clock" style={overrideStyle}>
      {/* Seconds */}
      <div className="circle">
        <div className="time">{getDisplayTime(ms)}</div>
        {/* Minutes */}
        <div className="mini-circle">
          <div
            className="m-hand hand"
            style={{ transform: `rotate(${mmDeg}deg)` }}
          ></div>
        </div>
        <div
          className="lap s-hand hand"
          style={{ transform: `rotate(${lapMsDeg}deg)` }}
        ></div>
        <div
          className="s-hand hand"
          style={{ transform: `rotate(${msDeg}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default Clock;
