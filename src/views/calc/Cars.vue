<template>
  <h1>Compare Efficiencies</h1>
  <h2>Adjust distance and price&nbsp;settings:</h2>
  <h3>Compare two drivers who upgrade their&nbsp;cars...</h3>
  <p>
    Bill needs over 66 {{ keys.dpf }} to match what Sarah saves at 10
    {{ keys.dpf }}.
  </p>
  <CarSettings fromParent="distance,price,metric,keys" />

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
        <CarsABsvg :diff="ab_pct_diff()" />
      </td>
    </tr>
    <tr>
      <th>Scores:</th>
      <th>Bill</th>
      <th>Sarah</th>
    </tr>
    <tr>
      <th>
        Old car rating:<br />
        <small
          >Fuel/distance:<br />
          Consumption:</small
        >
      </th>
      <td>
        <input class="number" type="number" v-model="Aold" disabled />
        {{ keys.dpf }}
        <br />
        <h6>{{ (1 / Aold).toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(Aold).toFixed(1) }} {{ keys.unitF }} </i>
        <small> (${{ costAt(Aold).toFixed(2) }}) </small>
      </td>
      <td>
        <input class="number" type="number" v-model="Bold" disabled />
        {{ keys.dpf }}
        <br />
        <div>{{ (1 / Bold).toFixed(3) }} {{ keys.fpd }}</div>
        <i> {{ fuelUsed(Bold).toFixed(1) }} {{ keys.unitF }} </i>
        <small> (${{ costAt(Bold).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>
        New car rating:<br />
        <small
          >Fuel/distance:<br />
          Consumption:</small
        >
      </th>
      <td>
        <input class="number" type="number" v-model="Anew" /> {{ keys.dpf }}
        <br />
        <h6>{{ (1 / Anew).toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(Anew).toFixed(2) }} {{ keys.unitF }}</i>
        <small> (${{ costAt(Anew).toFixed(2) }}) </small>
      </td>
      <td>
        <input class="number" type="number" v-model="Bnew" /> {{ keys.dpf }}
        <br />
        <h6>{{ (1 / Bnew).toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(Bnew).toFixed(2) }} {{ keys.unitF }}</i>
        <small> (${{ costAt(Bnew).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>Savings</th>
      <td>
        <i> {{ fuelReduction(Aold, Anew).toFixed(2) }} {{ keys.unitF }} </i>
        <small> (${{ moneySaved(Anew, Aold).toFixed(2) }}) </small>
      </td>
      <td>
        <i> {{ fuelReduction(Bold, Bnew).toFixed(2) }} {{ keys.unitF }} </i>
        <small> (${{ moneySaved(Bnew, Bold).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>Efficiency<br />increase</th>
      <td>
        <span>{{ calc_eff_inc(Aold, Anew).toFixed(0) }}%</span>
        <br />
        <small>({{ Anew }} / {{ Aold }})</small>
      </td>
      <td>
        <span>{{ calc_eff_inc(Bold, Bnew).toFixed(0) }}%</span>
        <br />
        <small>({{ Bnew }} / {{ Bold }})</small>
      </td>
    </tr>
    <tr>
      <th>{{ keys.fpd }}<br />improvement</th>
      <td>
        <span>{{ a_fpd_imp().toFixed(2) }}%</span>
        <br />
        <small>(1/{{ Aold }} – 1/{{ Anew }})</small>
      </td>
      <td>
        <span>{{ b_fpd_imp().toFixed(2) }}%</span>
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
        {{ ab_pct_diff_abs().toFixed(0) }}% improvement difference <br />
        <small>(relative fuel reduction)</small> <br />
        <small
          >{{ keys.fpd }} difference [B-A] divided by average [(A+B)/2]</small
        >
      </td>
    </tr>
  </table>

  <CarFooter />
</template>

<script>
  import model from './libs/car-compare-model.js';
  import CarSettings from './components/CarSettings.vue';
  import CarFooter from './components/CarFooter.vue';
  import CarsABsvg from './components/CarsABsvg.vue';

  const keepLessThan = (l, r) => (l >= r ? r - 1 : l);
  const keepMoreThan = (l, r) => (l <= r ? r + 1 : l);

  export default {
    name: 'Cars',
    components: { CarsABsvg, CarSettings, CarFooter },
    setup() {
      return model;
    },
    data() {
      return { metric: false };
    },
    computed: {
      keys() {
        return {
          dpf: this.metric ? 'km/L' : 'MPG',
          fpd: this.metric ? 'L/km' : 'gal/mi',
          unitF: this.metric ? 'Ltr' : 'gal',
          unitD: this.metric ? 'km' : 'mile',
        };
      },
      winner() {
        if (!this.ab_pct_diff()) return '';
        return this.ab_pct_diff() > 0 ? 'B' : 'A';
      },
    },
    watch: {
      Aold() {
        this.Aold = keepLessThan(this.Aold, this.Anew);
      },
      Bold() {
        this.Bold = keepLessThan(this.Bold, this.Bnew);
      },
      Anew() {
        this.Anew = keepMoreThan(this.Anew, this.Aold);
      },
      Bnew() {
        this.Bnew = keepMoreThan(this.Bnew, this.Bold);
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
