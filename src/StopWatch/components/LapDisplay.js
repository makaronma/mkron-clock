import React, { useMemo } from "react";
import { getDisplayTime } from "../../utils";

const LapDisplay = ({ lapTimeDifList, currentLapDuration }) => {
  const lapDisplayList = useMemo(() => {
    // console.log("render");
    return lapTimeDifList
      .slice(0)
      .reverse()
      .map((lap, index) => {
        // console.log("asd");
        return (
          <div className="lap" key={index}>
            <div className="left">Lap {lapTimeDifList.length - index}</div>
            <div className="right">{getDisplayTime(lap)}</div>
          </div>
        );
      });
  }, [lapTimeDifList]);

  return (
    <div id="lapDisplay">
      {currentLapDuration ? (
        <div className="lap">
          <div className="left">Lap {lapTimeDifList.length + 1}</div>
          <div className="right">{getDisplayTime(currentLapDuration)}</div>
        </div>
      ) : null}

      {lapDisplayList}
    </div>
  );
};

export default LapDisplay;

// Bad Performace:
// const lapDisplayList = lapTimeDifList
//     .slice(0)
//     .reverse()
//     .map((lap, index) => {
//       console.log('asd');
//       return (
//         <div className="lap" key={index}>
//           <div className="left">Lap {lapTimeDifList.length - index}</div>
//           <div className="right">{getDisplayTime(lap)}</div>
//         </div>
//       );
//     });
