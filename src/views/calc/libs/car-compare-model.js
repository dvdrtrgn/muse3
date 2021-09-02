import { reactive } from 'vue';

export default reactive({
  A1: 25,
  A2: 35,
  B1: 8,
  B2: 10,
  distance: 1400,
  price: '3.50',
  get a1_eff() {
    return this.A1;
  },
  get a1_eff_inv() {
    return 1 / this.A1;
  },
  get a2_eff() {
    return this.A2;
  },
  get a2_eff_inv() {
    return 1 / this.A2;
  },
  get b1_eff() {
    return this.B1;
  },
  get b1_eff_inv() {
    return 1 / this.B1;
  },
  get b2_eff() {
    return this.B2;
  },
  get b2_eff_inv() {
    return 1 / this.B2;
  },
  costAt(dpf) {
    return this.fuelUsed(dpf) * this.price;
  },
  fuelReduction(a, b) {
    return this.fuelUsed(a) - this.fuelUsed(b);
  },
  moneySaved(a, b) {
    return this.costAt(b) - this.costAt(a);
  },
  fuelUsed(dpf) {
    return this.distance / dpf;
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
