import React from "react";

const Clock = ({ ms }) => {
  const deg = (ms / 60000) * 360 - 90;
  return (
    <div id="clock">
      <div className="circle"></div>
      <div className="s-hand" style={{ transform: `rotate(${deg}deg)` }}></div>
      <div className="m-hand"></div>
    </div>
  );
};

export default Clock;
