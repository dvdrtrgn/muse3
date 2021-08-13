const typename = (self) => self.constructor.name;
const tinyfloat = (num) => Number.EPSILON * num || Number.EPSILON;

function wiggle(self) {
  let { valid, min, max } = self;
  if (valid) return;
  if (min === max) max += tinyfloat(max);
  self._b = max;
}

export default class RangeTuple {
  _a; // min
  _b; // max
  _s = true; // strict

  _swap() {
    [this._a, this._b] = [this._b, this._a];
  }
  _enforceOrder() {
    if (this.strict) wiggle(this);
    if (this._a === this._b)
      throw `${typename(this)}: bad min|max ${this._a}/${this._b}`;
    if (this._b <= this._a) this._swap();
  }

  get min() {
    return this._a;
  }
  get max() {
    return this._b;
  }
  get strict() {
    return this._s;
  }

  set min(num) {
    this._a = Number(num);
    this._enforceOrder();
  }
  set max(num) {
    this._b = Number(num);
    this._enforceOrder();
  }
  set strict(bool) {
    this._s = Boolean(bool);
    if (this.strict) wiggle(this);
  }

  constructor(min = -1, max = 1) {
    if (min == max) max = min + 1;
    this.min = min;
    this.max = max;
  }

  // extras

  get delta() {
    return this._b - this._a;
  }
  get valid() {
    return this._b > this._a;
  }
}
