import Range from './range.js';

function clamp(val, min, max) {
  min = min || 0;
  max = max || 100;
  return Math.min(max, Math.max(Number(val), min));
}

function percentBetween(val, min, max) {
  min = min || 0;
  max = max || 100;
  let delta = max - min;
  let factor = 100 / delta;
  return (val - min) * factor;
}

function normalize(val, min, max) {
  min = min || 0;
  max = max || 1;
  if (min >= max) throw 'inverted!';
  let delta = max - min;
  let factor = 1 / delta;
  return (val - min) * factor;
}

export default {
  percentBetween,
  clamp,
  normalize,
  Range,
};

/*
  say i wanna turn a number into percent
  so for numbers from 10 to 60,
  35 is in the middle
  therefore the normalization is 50%

  so I take 60 - 10 and get 50
  100/50 is 2
  the normalizing factor is 2 then


*/
