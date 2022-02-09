import { useCallback, useEffect, useState } from "react";
import TimeDisplay from "./TimeDisplay";
import LapDisplay from "./LapDisplay";
import "../styles/stopwatch.css";

const StopWatch = () => {
  const [startMs, setStartMs] = useState(0);
  const [ms, setMs] = useState(0);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [lapTimeList, setLapTimeList] = useState([]); // for calculate time dif
  const [lapTimeDifList, setTimeDifLapList] = useState([]);

  const [pauseTime, setPauseTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);

  // Init Time
  useEffect(() => {
    if (!started) return;
    setStartMs(Date.now());
  }, [started]);

  // Display Time Change
  useEffect(() => {
    if (!running) return;
    const stopWatchInterval = setInterval(() => {
      setMs(Date.now() - startMs);
    }, 50);
    return () => clearInterval(stopWatchInterval);
  }, [running, startMs, ms]);

  // Start / Stop Btn
  const handleStartStopBtnClick = () => {
    console.log(pausedDuration);

    // if not started
    if (!started) {
      // start stopwatch time count
      setStarted(true);
      // set starting time
      setLapTimeList([Date.now()]); //##
      // start running
      setRunning(true);
      return;
    }
    // if started already
    if (running) {
      // stop
      console.log("stop");
      setRunning(false);
      setPauseTime(Date.now());
    } else {
      // continue
      setRunning(true);
      setPausedDuration((prev) => prev + Date.now() - pauseTime); //##
      setStartMs((prev) => prev + Date.now() - pauseTime); //##
    }
  };

  // Lap Btn
  const handleLapBtnClick = () => {
    // Add current time
    setLapTimeList((prev) => [...prev, Date.now()]); //##

    // Add time dif between current time and prev lap time
    setTimeDifLapList((prevLapList) => {
      console.log("duration: " + pausedDuration);
      const dif =
        Date.now() - lapTimeList[lapTimeList.length - 1] - pausedDuration;
      console.log(dif);
      return [...prevLapList, dif];
    }); //##
    setPausedDuration(0); //##
  };

  // Reset Btn
  const handeResetBtnClick = useCallback(() => {
    // Set status to stopped, reset time
    setStarted(false);
    setMs(0);
    // Clear laps
    setLapTimeList([]); //##
    setTimeDifLapList([]); //##
    setPausedDuration(0); //##
  }, []);

  // useEffect(() => {
  //   console.log(lapTimeDifList);
  // }, [lapTimeDifList]);

  return (
    <div className="miniApp">
      <h2>Stop Watch</h2>
      <TimeDisplay ms={ms} />
      <div className="left">
        {running ? (
          <button onClick={handleLapBtnClick}>Lap</button>
        ) : (
          <button onClick={handeResetBtnClick}>Reset</button>
        )}
      </div>
      <div className="right">
        {running ? (
          <button onClick={handleStartStopBtnClick}>Stop</button>
        ) : (
          <button onClick={handleStartStopBtnClick}>Start</button>
        )}
      </div>
      <LapDisplay lapTimeDifList={lapTimeDifList} />
    </div>
  );
};

export default StopWatch;
