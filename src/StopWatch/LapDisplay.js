import React from "react";
import { msConvert } from "../utils";

const LapDisplay = ({ lapTimeDifList }) => {
  return (
    <div id="stopWatchLapDisplay">
      {lapTimeDifList
        .slice(0)
        .reverse()
        .map((lap, index) => {
            const { hh, mm, ss } = msConvert(lap);
            return (
            <div className="lap" key={index}>
              <div className="left">Lap {lapTimeDifList.length - index}</div>
              <div className="right">{JSON.stringify(lap)}</div>
              {/* <div className="right">{`${hh}:${mm}:${ss}`}</div> */}
            </div>
          );
        })}
    </div>
  );
};

export default LapDisplay;
