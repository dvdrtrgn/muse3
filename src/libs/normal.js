import Range from './range';

export default class Normal {
  calcNorm(num) {
    return (num - this.range.min) / this.range.delta;
  }
  calc(num) {
    return this.calcNorm(num || this.raw);
  }

  get value() {
    return this.calcNorm(this.raw);
  }

  constructor(max) {
    let range;

    if (max instanceof Range) {
      range = max;
    } else {
      range = new Range(0, max);
    }

    this.raw = range.max;
    this.range = range;
  }

  // extra

  get over() {
    return this.value > 1;
  }
  get under() {
    return this.value < 0;
  }
  get valid() {
    return !(this.over || this.under);
  }
}
