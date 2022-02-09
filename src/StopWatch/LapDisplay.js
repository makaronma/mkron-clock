import React, { useEffect } from "react";
import { getDisplayTime } from "../utils";

const LapDisplay = ({ lapTimeDifList, currentLapDuration }) => {
  useEffect(() => {
    console.log(currentLapDuration);
  }, [currentLapDuration]);
  return (
    <div id="stopWatchLapDisplay">
      {currentLapDuration ? (
        <div className="lap">
          <div className="left">Lap {lapTimeDifList.length + 1}</div>
          <div className="right">{getDisplayTime(currentLapDuration)}</div>
        </div>
      ) : null}

      {lapTimeDifList
        .slice(0)
        .reverse()
        .map((lap, index) => {
          return (
            <div className="lap" key={index}>
              <div className="left">Lap {lapTimeDifList.length - index}</div>
              <div className="right">{getDisplayTime(lap)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default LapDisplay;
