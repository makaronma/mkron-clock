import React, { useState, useEffect } from "react";

const useMinClockLayout = () => {
  const [minLongList, setMinLongList] = useState([]);
  const [minMidList, setMinMidList] = useState([]);
  const [minShortList, setMinShortList] = useState([]);

  useEffect(() => {
    const numOfLong = 6;
    const numOfMid = 30;
    const numOfShort = 30;

    for (let i = 0; i < numOfLong / 2; i++) {
      const Long = () => (
        <div
          className="frame long"
          style={{
            transform: `rotate(${(360 / numOfLong) * (i + 1) + 90}deg)`,
          }}
        ></div>
      );
      setMinLongList((prev) => [...prev, <Long key={i} />]);
    }

    for (let i = 0; i < numOfMid / 2; i++) {
      const Mid = () => (
        <div
          className="frame mid"
          style={{ transform: `rotate(${(360 / numOfMid) * (i + 1) + 90}deg)` }}
        ></div>
      );
      setMinMidList((prev) => [...prev, <Mid key={i} />]);
    }
    for (let i = 0; i < numOfShort / 2; i++) {
      const Short = () => (
        <div
          className="frame short"
          style={{
            transform: `rotate(${
              (360 / 15) * (i + 1) + 360 / (numOfShort / 2) / 2 / 2 + 90
            }deg)`,
          }}
        ></div>
      );
      setMinShortList((prev) => [...prev, <Short key={i} />]);
    }
  }, []);

  return [minLongList, minMidList, minShortList];
};

export default useMinClockLayout;
