import React, { useState, useEffect } from "react";

const useClockLayout = () => {
  const [longList, setLongList] = useState([]);
  const [midList, setMidList] = useState([]);
  const [shortList, setShortList] = useState([]);

  useEffect(() => {
    const numOfLong = 12;
    const numOfMid = 60;
    const numOfShort = 240;

    for (let i = 0; i < numOfLong / 2; i++) {
      const Long = () => (
        <div
          className="frame long"
          style={{ transform: `rotate(${(360 / 12) * (i + 1) + 90}deg)` }}
        ></div>
      );
      setLongList((prev) => [...prev, <Long key={i} />]);
    }

    for (let i = 0; i < numOfMid / 2; i++) {
      const Mid = () => (
        <div
          className="frame mid"
          style={{ transform: `rotate(${(360 / 60) * (i + 1) + 90}deg)` }}
        ></div>
      );
      setMidList((prev) => [...prev, <Mid key={i} />]);
    }
    for (let i = 0; i < numOfShort / 2; i++) {
      const Short = () => (
        <div
          className="frame short"
          style={{ transform: `rotate(${(360 / 240) * (i + 1) + 90}deg)` }}
        ></div>
      );
      setShortList((prev) => [...prev, <Short key={i} />]);
    }
  }, []);

  return [longList, midList, shortList];
};

export default useClockLayout;
