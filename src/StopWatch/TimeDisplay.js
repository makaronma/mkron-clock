import React from "react";
import { getDisplayTime } from "../utils";

const TimeDisplay = ({ ms }) => {
  return (
    <div id="stopWatchTimeDisplay">
      {getDisplayTime(ms)}
    </div>
  );
};

export default TimeDisplay;
