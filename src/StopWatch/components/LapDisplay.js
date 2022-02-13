import React, { useMemo } from "react";
import { getDisplayTime } from "../../utils";
import useMaxMinLap from "../customHooks/useMaxMinLap";
import { v4 as uuidv4 } from 'uuid';

const LapDisplay = ({ lapTimeDifList, currentLapDuration }) => {
  const [maxLap, minLap] = useMaxMinLap(lapTimeDifList);

  const lapDisplayList = useMemo(() => {
    return lapTimeDifList
      .slice(0)
      .reverse()
      .map((lap, index) => {
        const classMax = lap === maxLap ? "max " : "";
        const classMin = lap === minLap ? "min" : "";
        return (
          <div className={`lap ${classMax}${classMin}`} key={uuidv4()}>
            <div className="left">Lap {lapTimeDifList.length - index}</div>
            <div className="right">{getDisplayTime(lap)}</div>
          </div>
        );
      });
  }, [lapTimeDifList, maxLap, minLap]);

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
//       return (
//         <div className="lap" key={index}>
//           <div className="left">Lap {lapTimeDifList.length - index}</div>
//           <div className="right">{getDisplayTime(lap)}</div>
//         </div>
//       );
//     });
