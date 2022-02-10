import React, { useMemo } from "react";

const Clock = ({ ms, lapMs }) => {
  const msDeg = useMemo(() => (ms / 60000) * 360 - 90, [ms]);
  const lapMsDeg = useMemo(() => (lapMs / 60000) * 360 - 90, [lapMs]);
  const mmDeg = useMemo(() => (ms / 60000 / 60) * 360 - 90, [ms]);
  return (
    <div id="clock">
      {/* Seconds */}
      <div className="circle">
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
