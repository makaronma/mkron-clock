import React from "react";
import { msConvert } from "../utils";

const TimeDisplay = ({ ms }) => {
  const { hh, mm, ss } = msConvert(ms);
  return (
    <div id="stopWatchTimeDisplay">
      <span>{hh}</span>
      <span>{mm}</span>
      <span>{ss}</span>
    </div>
  );
};

export default TimeDisplay;
