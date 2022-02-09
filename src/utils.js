const preZero = (num) => {
  return ("0" + num).slice(-2);
};

const msConvert = (ms) => {
  const dd = preZero(ms);
  const ss = preZero(Math.floor(ms / 1000));
  const mm = preZero(Math.floor(ms / 1000 / 60));

  return { mm, ss, dd };
};

const getDisplayTime = (ms) => {
  const { mm, ss, dd } = msConvert(ms);
  return `${mm}:${ss}.${dd}`;
};

export { msConvert, getDisplayTime };
