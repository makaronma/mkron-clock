import React from "react";
import { msConvert } from "../utils";

const TimeDisplay = ({ ms }) => {
  const { mm, ss, dd } = msConvert(ms);
  return (
    <div id="stopWatchTimeDisplay">
      <span>{mm}</span>
      <span>{ss}</span>
      <span>{dd}</span>
    </div>
  );
};

export default TimeDisplay;
