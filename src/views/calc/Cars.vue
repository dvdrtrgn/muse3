<template>
  <h1>Compare Efficiencies</h1>
  <h2>Adjust distance and price&nbsp;settings:</h2>
  <h3>Compare two drivers who upgrade their&nbsp;cars...</h3>
  <p>
    Bill needs over 66 {{ key.dpf }} to match what Sarah saves at 10
    {{ key.dpf }}.
  </p>
  <CarSettings fromParent="distance,price,metric,key" />

  <table>
    <tr>
      <td>
        <pre>
  bill
  v.
  sarah
        </pre>
      </td>
      <td colspan="2">
        <CarsABsvg :diff="pctDiff" />
      </td>
    </tr>
    <tr>
      <th>Scores:</th>
      <th>Bill</th>
      <th>Sarah</th>
    </tr>
    <tr>
      <th>Old car</th>
      <td>
        <input class="number" type="number" v-model="Aold" disabled />
        {{ key.dpf }}
        <br />
        <i> {{ fuelUsed(Aold).toFixed(1) }} {{ key.unitF }} </i>
        <small> (${{ costAt(Aold).toFixed(2) }}) </small>
        <h6>{{ (1 / Aold).toFixed(3) }} {{ key.fpd }}</h6>
      </td>
      <td>
        <input class="number" type="number" v-model="Bold" disabled />
        {{ key.dpf }}
        <br />
        <i> {{ fuelUsed(Bold).toFixed(1) }} {{ key.unitF }} </i>
        <small> (${{ costAt(Bold).toFixed(2) }}) </small>
        <h6>{{ (1 / Bold).toFixed(3) }} {{ key.fpd }}</h6>
      </td>
    </tr>
    <tr>
      <th>New car</th>
      <td>
        <input class="number" type="number" v-model="Anew" /> {{ key.dpf }}
        <br />
        <i> {{ fuelUsed(Anew).toFixed(2) }} {{ key.unitF }}</i>
        <small> (${{ costAt(Anew).toFixed(2) }}) </small>
        <h6>{{ (1 / Anew).toFixed(3) }} {{ key.fpd }}</h6>
      </td>
      <td>
        <input class="number" type="number" v-model="Bnew" /> {{ key.dpf }}
        <br />
        <i> {{ fuelUsed(Bnew).toFixed(2) }} {{ key.unitF }}</i>
        <small> (${{ costAt(Bnew).toFixed(2) }}) </small>
        <h6>{{ (1 / Bnew).toFixed(3) }} {{ key.fpd }}</h6>
      </td>
    </tr>
    <tr>
      <th>Savings</th>
      <td>
        <i> {{ fuelReduction(Aold, Anew).toFixed(2) }} {{ key.unitF }} </i>
        <small> (${{ moneySaved(Anew, Aold).toFixed(2) }}) </small>
      </td>
      <td>
        <i> {{ fuelReduction(Bold, Bnew).toFixed(2) }} {{ key.unitF }} </i>
        <small> (${{ moneySaved(Bnew, Bold).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>Efficiency<br />increase</th>
      <td>
        <span>{{ percentDiff(Aold, Anew).toFixed(0) }}%</span>
        <br />
        <small>({{ Anew }} / {{ Aold }})</small>
      </td>
      <td>
        <span>{{ percentDiff(Bold, Bnew).toFixed(0) }}%</span>
        <br />
        <small>({{ Bnew }} / {{ Bold }})</small>
      </td>
    </tr>
    <tr>
      <th>{{ key.fpd }}<br />improvement</th>
      <td>
        <span>{{ carA_fpd.toFixed(2) }}%</span>
        <br />
        <small>(1/{{ Aold }} – 1/{{ Anew }})</small>
      </td>
      <td>
        <span>{{ carB_fpd.toFixed(2) }}%</span>
        <br />
        <small>(1/{{ Bold }} – 1/{{ Bnew }})</small>
      </td>
    </tr>
    <tr>
      <th>
        Who saves? <br />
        {{ winner ? winner + ' wins!' : 'Tie' }}
      </th>
      <td colspan="2">
        {{ Math.abs(pctDiff).toFixed(0) }}% improvement difference <br />
        <small>(relative fuel reduction)</small> <br />
        <small
          >{{ key.fpd }} difference [B-A] divided by average [(A+B)/2]</small
        >
      </td>
    </tr>
  </table>

  <CarFooter />
</template>

<script>
  import CarSettings from './components/CarSettings.vue';
  import CarFooter from './components/CarFooter.vue';
  import CarsABsvg from './components/CarsABsvg.vue';
  import CarUpgrade from './libs/CarUpgrade.js';
  window.CarUpgrade = CarUpgrade;

  export default {
    name: 'Cars',
    components: { CarsABsvg, CarSettings, CarFooter },
    data() {
      return {
        Aold: 25,
        Anew: 35,
        Bold: 8,
        Bnew: 10,
        distance: 1400,
        price: '3.50',
        metric: false,
      };
    },
    methods: {
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
      percentDiff(car1, car2) {
        return (car2 / car1) * 100 - 100;
      },
    },
    computed: {
      carA_fpd() {
        return (1 / this.Aold - 1 / this.Anew) * 100;
      },
      carB_fpd() {
        return (1 / this.Bold - 1 / this.Bnew) * 100;
      },
      pctDiff() {
        let dif = this.carB_fpd - this.carA_fpd;
        let avg = (this.carB_fpd + this.carA_fpd) / 2;
        return Math.round((dif / avg) * 100) || 0;
      },
      winner() {
        if (!this.pctDiff) return '';
        return this.pctDiff > 0 ? 'B' : 'A';
      },
      key() {
        return {
          dpf: this.metric ? 'km/L' : 'MPG',
          fpd: this.metric ? 'L/km' : 'gal/mi',
          unitF: this.metric ? 'Ltr' : 'gal',
          unitD: this.metric ? 'km' : 'mile',
        };
      },
    },
    watch: {
      Aold() {
        if (this.Aold >= this.Anew) this.Aold = this.Anew - 1;
      },
      Bold() {
        if (this.Bold >= this.Bnew) this.Bold = this.Bnew - 1;
      },
      Anew() {
        if (this.Anew <= this.Aold) this.Anew = this.Aold + 1;
      },
      Bnew() {
        if (this.Bnew <= this.Bold) this.Bnew = this.Bold + 1;
      },
    },
  };
</script>

<style lang="scss">
  #Cars {
    table {
      border-collapse: collapse;
      line-height: 1.5;
      margin: auto;
      max-width: 33rem;
      width: 100%;
    }
    td,
    th {
      padding: 0.5em;
    }
    tr + tr {
      border-top: 1px solid #ccc;
    }
    input {
      font-size: 1rem;
      text-align: right;
    }
    h6 {
      margin: 0;
    }
  }
</style>
