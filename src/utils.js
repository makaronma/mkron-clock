const preZero = (num) => {
  return ("0" + num).slice(-2);
};

const msConvert = (ms) => {
  const ss = preZero(ms);
  const m = Math.floor(ms / 1000);
  const mm = preZero(m);
  const hh = preZero(Math.floor(ms / 1000 / 60));

  return { hh, mm, ss };
};

export { msConvert };
