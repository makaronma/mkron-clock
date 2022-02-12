import React, { useMemo, useCallback } from "react";
import { getDisplayTime } from "../../utils";
import useClockLayout from "../customHooks/useClockLayout";
import useMinClockLayout from "../customHooks/useMinClockLayout";

const Clock = ({ ms, lapMs }) => {
  const msDeg = useMemo(() => (ms / 60000) * 360 - 90, [ms]);
  const lapMsDeg = useMemo(() => (lapMs / 60000) * 360 - 90, [lapMs]);
  const mmDeg = useMemo(() => (ms / 60000 / 60) * 360 - 90, [ms]);

  const [longList, midList, shortList] = useClockLayout();
  const [minLongList, minMidList, minShortList] = useMinClockLayout();

  const CircleLayout = useCallback(
    () => (
      <div className="layouts">
        <div className="shorts">
          {shortList}
          <div className="short-cover"></div>
        </div>
        <div className="mids">
          {midList}
          <div className="mid-cover"></div>
        </div>
        <div className="longs">
          {longList}
          <div className="long-cover"></div>
        </div>
      </div>
    ),
    [shortList, midList, longList]
  );

  const MinCircleLayout = useCallback(
    () => (
      <div className="layouts">
        <div className="shorts">
          {minShortList}
          <div className="short-cover"></div>
        </div>
        <div className="mids">
          {minMidList}
          <div className="mid-cover"></div>
        </div>
        <div className="longs">
          {minLongList}
          <div className="long-cover"></div>
        </div>
      </div>
    ),
    [minLongList, minMidList, minShortList]
  );

  return (
    <div id="clock">
      {/* Seconds */}
      <div className="circle">
        <CircleLayout />
        <div className="time">{getDisplayTime(ms)}</div>
        {/* Minutes */}
        <div className="mini-circle">
          <MinCircleLayout />
          <div
            className="m-hand hand"
            style={{ transform: `rotate(${mmDeg}deg)` }}
          ></div>
        </div>
        <div
          className="lap s-hand hand"
          style={{ transform: `rotate(${lapMsDeg}deg)` }}
        ></div>
        <div
          className="s-hand hand"
          style={{ transform: `rotate(${msDeg}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default Clock;
