export function slope(x, y) {
  const rads = Math.atan2(y, x);
  const degs = (180 * rads) / Math.PI;

  return Math.round(degs);
}

export function slope360(move) {
  const angle = slope(move.x, move.y);
  const normal = (360 + angle) % 360;

  return normal;
}

export function cardinal(angle) {
  const dirs = 'E SE S SW W NW N NE'.split(' ');
  const index = Math.round(angle / 45) % 8;

  return dirs[index];
}
