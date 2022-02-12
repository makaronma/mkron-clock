import React from "react";
import { getDisplayTime } from "../../utils";

const TimeDisplay = ({ ms }) => {
  return (
    <div id="timeDisplay">
      {getDisplayTime(ms)}
    </div>
  );
};

export default TimeDisplay;
