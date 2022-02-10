import React from "react";

const ControlPanel = ({
  running,
  handleLapBtnClick,
  handeResetBtnClick,
  handleStartStopBtnClick,
}) => {
  return (
    <>
      <div className="left">
        {running ? (
          <button onClick={handleLapBtnClick} className="lap">
            Lap
          </button>
        ) : (
          <button onClick={handeResetBtnClick} className="reset">
            Reset
          </button>
        )}
      </div>
      <div className="right">
        {running ? (
          <button onClick={handleStartStopBtnClick} className="stop">
            Stop
          </button>
        ) : (
          <button onClick={handleStartStopBtnClick} className="start">
            Start
          </button>
        )}
      </div>
    </>
  );
};

export default ControlPanel;
