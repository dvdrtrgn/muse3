import Range from './range';

function _calcAbs(self, num) {
  return self.range.delta * num + self.range.min;
}
function _calcRel(self, num) {
  return (num - self.range.min) / self.range.delta;
}

class Normal {
  get abs() {
    return this._raw;
  }
  get rel() {
    return _calcRel(this, this._raw);
  }

  set abs(num) {
    this._raw = Number(num);
  }
  set rel(num) {
    if (this.range.valid) this._raw = _calcAbs(this, num);
    else throw 'Normal: invalid range';
  }

  constructor(max) {
    let range;

    if (max instanceof Range) {
      range = max;
    } else {
      range = new Range(0, max);
    }

    this.abs = range.max;
    this.range = range;
  }

  // extras

  get over() {
    return this.rel > 1;
  }
  get under() {
    return this.rel < 0;
  }
  get valid() {
    return !(this.over || this.under);
  }

  rescale() {
    if (this.under) {
      this.range.min = this.abs;
    } else if (this.over) {
      this.range.max = this.abs;
    }
  }
  relative() {
    return this.rel.toLocaleString();
  }
}

export default Normal;
