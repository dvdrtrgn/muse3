export default class Range {
  _enforceOrder() {
    if (this._a === this._b) throw 'not a range';
    if (this._b <= this._a) [this._a, this._b] = [this._b, this._a];
  }

  get min() {
    return this._a;
  }
  get max() {
    return this._b;
  }

  set min(num) {
    this._a = Number(num);
    this._enforceOrder();
  }
  set max(num) {
    this._b = Number(num);
    this._enforceOrder();
  }

  constructor(min = -1, max = 1) {
    if (min == max) max = min + 1;
    this.min = min;
    this.max = max;
  }

  // extra

  get delta() {
    return this._b - this._a;
  }
  get valid() {
    return this._b > this._a;
  }
}
