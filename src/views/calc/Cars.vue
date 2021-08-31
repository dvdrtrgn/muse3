<template>
  <h1>Compare Efficiencies</h1>
  <h2>Adjust distance and price&nbsp;settings:</h2>
  <CarSettings fromParent="distance,price,metric" />
  <h3>Compare two owners who upgrade their&nbsp;cars...</h3>

  <table>
    <tr>
      <td></td>
      <td colspan="2">
        <CarsABsvg :diff="pctDiff" />
      </td>
    </tr>
    <tr>
      <th></th>
      <th>Owner A</th>
      <th>Owner B</th>
    </tr>
    <tr>
      <th>Old car</th>
      <td>
        <input class="number" type="number" v-model="Aold" disabled /> mpg
        <br />
        <i> {{ gallons(Aold).toFixed(1) }}gal </i>
        <small> (${{ costAtPer(Aold).toFixed(2) }}) </small>
        <h6>{{ (1 / Aold).toFixed(3) }}gpm</h6>
      </td>
      <td>
        <input class="number" type="number" v-model="Bold" disabled /> mpg
        <br />
        <i> {{ gallons(Bold).toFixed(1) }}gal </i>
        <small> (${{ costAtPer(Bold).toFixed(2) }}) </small>
        <h6>{{ (1 / Bold).toFixed(3) }}gpm</h6>
      </td>
    </tr>
    <tr>
      <th>New car</th>
      <td>
        <input class="number" type="number" v-model="Anew" /> mpg
        <br />
        <i> {{ gallons(Anew).toFixed(1) }}gal</i>
        <small> (${{ costAtPer(Anew).toFixed(2) }}) </small>
        <h6>{{ (1 / Anew).toFixed(3) }}gpm</h6>
      </td>
      <td>
        <input class="number" type="number" v-model="Bnew" /> mpg
        <br />
        <i> {{ gallons(Bnew).toFixed(1) }}gal</i>
        <small> (${{ costAtPer(Bnew).toFixed(2) }}) </small>
        <h6>{{ (1 / Bnew).toFixed(3) }}gpm</h6>
      </td>
    </tr>
    <tr>
      <th>Savings</th>
      <td>
        <i> {{ compareGals(Aold, Anew).toFixed(1) }}gal </i>
        <small> (${{ compareCost(Anew, Aold).toFixed(2) }}) </small>
      </td>
      <td>
        <i> {{ compareGals(Bold, Bnew).toFixed(1) }}gal </i>
        <small> (${{ compareCost(Bnew, Bold).toFixed(2) }}) </small>
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
      <th>GPM<br />improvement</th>
      <td>
        <span>{{ carA_gpm.toFixed(2) }}%</span>
        <br />
        <small>(1/{{ Aold }} – 1/{{ Anew }})</small>
      </td>
      <td>
        <span>{{ carB_gpm.toFixed(2) }}%</span>
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
        <small>GPM difference [B-A] divided by average [(A+B)/2]</small>
      </td>
    </tr>
  </table>

  <CarFooter />
</template>

<script>
  import CarSettings from './components/CarSettings.vue';
  import CarFooter from './components/CarFooter.vue';
  import CarsABsvg from './components/CarsABsvg.vue';

  export default {
    name: 'Cars',
    components: { CarsABsvg, CarSettings, CarFooter },
    data() {
      return {
        Aold: 25,
        Anew: 35,
        Bold: 8,
        Bnew: 10,
        distance: 10,
        price: 1,
        metric: false,
      };
    },
    methods: {
      costAtPer(mpg) {
        return this.gallons(mpg) * this.price;
      },
      compareGals(a, b) {
        return this.gallons(a) - this.gallons(b);
      },
      compareCost(a, b) {
        return this.costAtPer(a) - this.costAtPer(b);
      },
      gallons(mpg) {
        return this.distance / mpg;
      },
      percentDiff(car1, car2) {
        return (car2 / car1) * 100 - 100;
      },
    },
    computed: {
      carA_gpm() {
        return (1 / this.Aold - 1 / this.Anew) * 100;
      },
      carB_gpm() {
        return (1 / this.Bold - 1 / this.Bnew) * 100;
      },
      pctDiff() {
        let dif = this.carB_gpm - this.carA_gpm;
        let avg = (this.carB_gpm + this.carA_gpm) / 2;
        return Math.round((dif / avg) * 100) || 0;
      },
      winner() {
        if (!this.pctDiff) return '';
        return this.pctDiff > 0 ? 'B' : 'A';
      },
    },
    watch: {
      Anew() {
        if (this.Anew < this.Aold) this.Anew = this.Aold;
      },
      Bnew() {
        if (this.Bnew < this.Bold) this.Bnew = this.Bold;
      },
      metric() {
        console.log('this.metric', this.metric);
      }
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
