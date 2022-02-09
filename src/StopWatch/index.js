import { useCallback, useEffect, useMemo, useState } from "react";
import TimeDisplay from "./TimeDisplay";
import LapDisplay from "./LapDisplay";
import Clock from './Clock'
import "../styles/stopwatch.css";

const StopWatch = () => {
  const [startMs, setStartMs] = useState(0);
  const [ms, setMs] = useState(0);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [lapTimeList, setLapTimeList] = useState([]); // for calculate time dif
  const [lapTimeDifList, setTimeDifLapList] = useState([]);

  const [currentLapDuration, setCurrentLapDuration] = useState(0);

  const [pauseTime, setPauseTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);

  // Init Time
  useEffect(() => {
    if (!started) return;
    const curr = Date.now();
    setStartMs(curr);
    setLapTimeList([curr]);
  }, [started]);

  // Display Time Change
  useEffect(() => {
    if (!running) return;
    const stopWatchInterval = setInterval(() => {
      const curr = Date.now();
      setMs(curr - startMs);
      setCurrentLapDuration(
        curr - lapTimeList[lapTimeList.length - 1] - pausedDuration
      );
    }, 100);
    return () => clearInterval(stopWatchInterval);
  }, [running, startMs, ms, lapTimeList, pausedDuration]);

  // Start / Stop Btn
  const handleStartStopBtnClick = () => {
    const curr = Date.now();

    // if not started
    if (!started) {
      // start stopwatch time count
      setStarted(true);
      // start running
      setRunning(true);
      return;
    }
    // if started already
    if (running) {
      // stop
      setRunning(false);
      setPauseTime(curr);
    } else {
      // continue
      setRunning(true);
      setPausedDuration((prev) => prev + curr - pauseTime);
      setStartMs((prev) => prev + curr - pauseTime);
    }
  };

  // Lap Btn
  const handleLapBtnClick = () => {
    const curr = Date.now();
    // Add current time
    setLapTimeList((prev) => [...prev, curr]);

    // Add time dif between current time and prev lap time
    setTimeDifLapList((prevLapList) => {
      const dif = curr - lapTimeList[lapTimeList.length - 1] - pausedDuration;
      return [...prevLapList, dif];
    });
    setPausedDuration(0);
    setCurrentLapDuration(0);
  };

  // Reset Btn
  const handeResetBtnClick = useCallback(() => {
    // Set status to stopped, reset time
    setStarted(false);
    setMs(0);
    // Clear laps
    setLapTimeList([]);
    setTimeDifLapList([]);
    setPausedDuration(0);
    setCurrentLapDuration(0);
  }, []);

  return (
    <div className="miniApp">
      <h2>Stop Watch</h2>
      <Clock ms={ms} />
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
      <LapDisplay
        lapTimeDifList={lapTimeDifList}
        currentLapDuration={currentLapDuration}
      />
    </div>
  );
};

export default StopWatch;
