function percentIncrease(v) {
  return v * 100 - 100;
}

class Car {
  dpf = 1;

  constructor(dpf) {
    this.dpf = dpf;
  }
  get fpd() {
    return 1 / this.dpf; // FuelPerDistance
  }

  fuelFor(distance) {
    return this.fpd * distance;
  }
  costPer(fuelPrice) {
    return this.fpd * fuelPrice;
  }
  costToTravel(distance, fuelPrice) {
    return this.fuelFor(distance) * fuelPrice;
  }
}

// class CarInContext {
//   constructor() {}
//   set context(obj) {
//     this._ctx = obj;
//   }
//   get context() {
//     this._ctx = this._ctx || {};
//     return this._ctx;
//   }
//   seekcontext(nom) {
//     return this[nom] || this.context[nom];
//   }
// }

export default class CarUpgrade {
  // efficiency is efficiency (MPG or Dist/Fuel DPF)
  distance = 1400;
  price = 3.5;

  constructor(old_dpf, new_dpf) {
    this.old = new Car(old_dpf || 8);
    this.new = new Car(new_dpf || 10);
  }

  setDistance(val) {
    this.distance = val;
  }
  setPrice(val) {
    this.price = val;
  }

  get oldFPD() {
    return this.old.fpd;
  }
  get newFPD() {
    return this.new.fpd;
  }

  get oldFuel() {
    return this.old.fuelFor(this.distance);
  }
  get newFuel() {
    return this.new.fuelFor(this.distance);
  }

  get oldCost() {
    return this.old.costToTravel(this.distance, this.price);
  }
  get newCost() {
    return this.new.costToTravel(this.distance, this.price);
  }

  // DERIVED

  get oldFuelPer100() {
    return this.oldFPD * 100;
  }
  get newFuelPer100() {
    return this.newFPD * 100;
  }

  get oldCostPer() {
    return this.old.costPer(this.price);
  }
  get newCostPer() {
    return this.new.costPer(this.price);
  }

  get moneySaved() {
    return this.oldCost - this.newCost;
  }
  get fuelSaved() {
    return this.oldFuel - this.newFuel;
  }

  get fpdIncreasePct() {
    return percentIncrease(this.oldFPD / this.newFPD);
  }

  get fpdDiff() {
    return this.oldFPD - this.newFPD;
  }
}
