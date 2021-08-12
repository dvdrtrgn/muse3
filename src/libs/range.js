export default class Range {
  constructor(min, max) {
    min = min || 0;
    max = max || 1;

    if (min === max) throw 'not a range';

    this.min = min;
    this.max = max;

    if (this.inverted) console.log('inverted!');
  }

  get delta() {
    return Math.abs(this.max - this.min);
  }
  get inverted() {
    return this.max <= this.min;
  }
}
