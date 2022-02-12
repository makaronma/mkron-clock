import React from "react";
import { getDisplayTime } from "../../utils";

const TimeDisplay = ({ ms, overrideStyle }) => {
  return (
    <div id="timeDisplay" style={overrideStyle}>
      {getDisplayTime(ms)}
    </div>
  );
};

export default TimeDisplay;
