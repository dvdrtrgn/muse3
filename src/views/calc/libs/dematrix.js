/*
  DeMatrix
  Take css transform gibberish; output sanity.
*/
function DeMatrix(zh, sy, sx, zv, tx, ty) {
    return {
        rotation: Math.atan2(sx, zv) * (180 / Math.PI),
        scaleX: zh,
        scaleY: zv,
        skewY: sy,
        skewX: sx,
        translateX: tx,
        translateY: ty,
    };
}

DeMatrix.parse = function (str) {
    return this.apply(0, this.read2dCss(str));
};

DeMatrix.read2dCss = function (str) {
    str = str.slice(7).slice(0, -1); // strip `matrix(...)`
    return (str || '1, 0, 0, 1, 0, 0').split(', ').map(Number);
};

DeMatrix.readTransform = function (sel) {
    let ele;
    if (typeof sel !== 'string') ele = sel;
    else ele = document.querySelector(sel);
    if (!ele) return '{missing}';

    return window.getComputedStyle(ele).getPropertyValue('transform');
};

export default DeMatrix;

/*
  matrix(a, b, c, d, tx, ty)
  is a shorthand for
  matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1).
*/
