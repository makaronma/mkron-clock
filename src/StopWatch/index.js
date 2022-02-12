import { useCallback, useEffect, useRef, useState } from "react";
import TimeDisplay from "./components/TimeDisplay";
import LapDisplay from "./components/LapDisplay";
import Clock from "./components/Clock";
import ControlPanel from "./components/ControlPanel";
import "../scss/stopwatch.scss";

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

  const [displayForm, setDisplayForm] = useState(0);
  const touchStartPos = useRef();
  const displaysContainer = useRef();

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
    }, 50);
    return () => clearInterval(stopWatchInterval);
  }, [running, startMs, ms, lapTimeList, pausedDuration]);

  // Start / Stop Btn
  const handleStartStopBtnClick = useCallback(() => {
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
  }, [started, running, pauseTime]);

  // Lap Btn
  const handleLapBtnClick = useCallback(() => {
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
  }, [lapTimeList, pausedDuration]);

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

  // Handle swipe
  const handleTouchStart=(e)=>{
    touchStartPos.current = e.touches[0].clientX;
  }
  const handleTouchEnd=(e)=>{
    const touchEndPos = e.changedTouches[0].clientX;
    const posDif = touchEndPos - touchStartPos.current;
    const {width} = displaysContainer.current.getBoundingClientRect();
    if (posDif < -width / 2) {
      setDisplayForm(1)
    } else if (posDif > width / 2) {
      setDisplayForm(0)
    }
  }

  return (
    <div id="stopWatch">
      <div id="clockPanel">
        <div
          className="displays"
          style={{
            transform: `translateX(${displayForm === 1 ? "-100%" : "0"})`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          ref={displaysContainer}
        >
          <TimeDisplay ms={ms} />
          <Clock ms={ms} lapMs={currentLapDuration} />
        </div>
        <ControlPanel
          running={running}
          handleLapBtnClick={handleLapBtnClick}
          handeResetBtnClick={handeResetBtnClick}
          handleStartStopBtnClick={handleStartStopBtnClick}
        />
        <div className="bullets">
          <div
            className={`bullet ${displayForm === 0 ? "current" : null}`}
            onClick={() => setDisplayForm(0)}
          ></div>
          <div
            className={`bullet ${displayForm === 1 ? "current" : null}`}
            onClick={() => setDisplayForm(1)}
          ></div>
        </div>
      </div>
      <LapDisplay
        lapTimeDifList={lapTimeDifList}
        currentLapDuration={currentLapDuration}
      />
    </div>
  );
};

export default StopWatch;
