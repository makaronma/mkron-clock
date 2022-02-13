import { useState, useEffect } from "react";

const useMaxMinLap = (lapTimeDifList) => {
  const [maxLap, setMaxLap] = useState();
  const [minLap, setMinLap] = useState();
  
  useEffect(() => {
    setMinLap(Math.min(...lapTimeDifList));
    setMaxLap(Math.max(...lapTimeDifList));
  }, [lapTimeDifList]);

  return [maxLap, minLap];
};

export default useMaxMinLap;
