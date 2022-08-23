export function minmidmax(min = -1, mid = 0, max = 1) {
    return Math.min(Math.max(parseInt(mid), min), max);
}

export function rectVals(rectEl) {
    const parent = rectEl?.viewportElement;
    const rect = parent?.getBoundingClientRect() || { left: 1, top: 1, width: 1 };
    const box = parent?.viewBox?.baseVal || { width: 1 };
    const vals = {
        l: rect.left,
        t: rect.top,
        z: rect.width / box.width,
        w: box.width - rectEl.width.baseVal.value,
        h: box.height - rectEl.height.baseVal.value,
    };
    // console.log(vals);
    return vals;
}
