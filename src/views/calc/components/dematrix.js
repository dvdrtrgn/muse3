/*
  DeMatrix
  Take css transform gibberish; output sanity.
*/
function DeMatrix(a, b, c, d, e, f) {
  return {
    b,
    c,
    rotation: Math.atan2(c, d) * (180 / Math.PI),
    scaleX: a,
    scaleY: d,
    translateX: e,
    translateY: f,
  };
}

DeMatrix.parse = function(str) {
  return this.apply(0, this.read2dCss(str));
};

DeMatrix.read2dCss = function(str) {
  str = str.slice(7).slice(0, -1); // strip `matrix(...)`
  return (str || '1, 0, 0, 1, 0, 0').split(', ').map(Number);
};

export default DeMatrix;
