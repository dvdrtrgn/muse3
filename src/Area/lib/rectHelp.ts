export function minmidmax(min = -1, mid = 0, max = 1) {
    return Math.min(Math.max(Number(mid), min), max);
}

export function rectVals(rectEl) {
    const parent = rectEl?.viewportElement;
    const rect = parent?.getBoundingClientRect() || { left: 1, top: 1, width: 1 };
    const box = parent?.viewBox?.baseVal || { width: 1 };
    const vals = {
        vl: rect.left,
        vt: rect.top,
        vw: rect.width,
        vh: rect.height,
        pw: box.width - rectEl.width.baseVal.value,
        ph: box.height - rectEl.height.baseVal.value,
        z: rect.width / box.width,
    };
    // console.log(vals);
    return vals;
}
