import { reactive } from 'vue';
import CarEff from './car-efficiency.js';

export default reactive({
  A1: new CarEff(25),
  A2: new CarEff(35),
  B1: new CarEff(8),
  B2: new CarEff(10),
  distance: 1400,
  price: '3.50',
  fuelUsed(car) {
    return this.distance * car.efi;
  },
  costAt(car) {
    return this.fuelUsed(car) * this.price;
  },
  fuelReduction(a, b) {
    return this.fuelUsed(a) - this.fuelUsed(b);
  },
  moneySaved(a, b) {
    return this.costAt(b) - this.costAt(a);
  },
  calc_eff_inc(v1, v2) {
    return (v2 / v1) * 100 - 100;
  },
  a_fpd_imp() {
    return changePct(this.A1, this.A2);
  },
  b_fpd_imp() {
    return changePct(this.B1, this.B2);
  },
  ab_pct_diff() {
    return diffPct(this.a_fpd_imp(), this.b_fpd_imp());
  },
  ab_pct_diff_abs() {
    return Math.abs(this.ab_pct_diff());
  },
});

function changePct(vold, vnew) {
  return (1 / vold - 1 / vnew) * 100;
}

function average(...args) {
  return args.reduce((a, b) => a + b, 0) / args.length;
}

function diffPct(v1, v2) {
  let dif = v2 - v1;
  let avg = average(v1, v2);
  return Math.round((dif / avg) * 100) || 0;
}
