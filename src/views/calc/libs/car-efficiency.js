// Eff (efficiency) = DPF (distance per fuel, MPG)
// Efi (efficiency inverted) = FPD (fuel per distance)
/*
  Car data type (attributes of car only)
  {
    eff (dpf, MPG)
    efi (fpd, L/km)
    ef100 (L/100km)
  }
*/

class CarEfficiency {
    constructor(mpg) {
        this['.'] = { raw: mpg || 1 };
        console.log(this);
    }
    get eff() {
        return this['.'].raw;
    }
    set eff(val) {
        this['.'].raw = val;
    }

    // derived

    get efi() {
        return 1 / this.eff;
    }
    set efi(val) {
        this.eff = 1 / val;
    }
    get ef100() {
        return this.efi * 100;
    }
    set ef100(val) {
        this.efi = 100 / val;
    }

    valueOf() {
        return Number(this.eff);
    }
    toString() {
        return this.valueOf().toFixed(2);
    }
}

export default CarEfficiency;
