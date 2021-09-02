import { reactive } from 'vue';

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

export default reactive({
  Aold: 25,
  Anew: 35,
  Bold: 8,
  Bnew: 10,
  distance: 1400,
  price: '3.50',
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
    return changePct(this.Aold, this.Anew);
  },
  b_fpd_imp() {
    return changePct(this.Bold, this.Bnew);
  },
  ab_pct_diff() {
    return diffPct(this.a_fpd_imp(), this.b_fpd_imp());
  },
  ab_pct_diff_abs() {
    return Math.abs(this.ab_pct_diff());
  },

});
