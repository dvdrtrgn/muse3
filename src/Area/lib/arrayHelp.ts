const moveItem = (arr, idx1, idx2) => {
    return arr.splice(idx2, 0, arr.splice(idx1, 1)[0]);
};

export function hoistElement(arr, item) {
    let idx1 = arr.indexOf(item);
    let idx2 = arr.length;
    // foremost? bury!
    if (idx1 + 1 === idx2) idx2 = 0;

    moveItem(arr, idx1, idx2);
}
