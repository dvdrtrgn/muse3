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
        <input class="number" type="number" v-model.number="A1" disabled />
        {{ keys.dpf }}
        <br />
        <h6>{{ a1_eff_inv.toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(A1).toFixed(1) }} {{ keys.unitF }} </i>
        <small> (${{ costAt(A1).toFixed(2) }}) </small>
      </td>
      <td>
        <input class="number" type="number" v-model.number="B1" disabled />
        {{ keys.dpf }}
        <br />
        <h6>{{ b1_eff_inv.toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(B1).toFixed(1) }} {{ keys.unitF }} </i>
        <small> (${{ costAt(B1).toFixed(2) }}) </small>
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
        <input class="number" type="number" v-model.number="A2" />
        {{ keys.dpf }}
        <br />
        <h6>{{ a2_eff_inv.toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(A2).toFixed(2) }} {{ keys.unitF }}</i>
        <small> (${{ costAt(A2).toFixed(2) }}) </small>
      </td>
      <td>
        <input class="number" type="number" v-model.number="B2" />
        {{ keys.dpf }}
        <br />
        <h6>{{ b2_eff_inv.toFixed(3) }} {{ keys.fpd }}</h6>
        <i> {{ fuelUsed(B2).toFixed(2) }} {{ keys.unitF }}</i>
        <small> (${{ costAt(B2).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>Savings</th>
      <td>
        <i> {{ fuelReduction(A1, A2).toFixed(2) }} {{ keys.unitF }} </i>
        <small> (${{ moneySaved(A2, A1).toFixed(2) }}) </small>
      </td>
      <td>
        <i> {{ fuelReduction(B1, B2).toFixed(2) }} {{ keys.unitF }} </i>
        <small> (${{ moneySaved(B2, B1).toFixed(2) }}) </small>
      </td>
    </tr>
    <tr>
      <th>Efficiency<br />increase</th>
      <td>
        <span>{{ calc_eff_inc(A1, A2).toFixed(0) }}%</span>
        <br />
        <small>({{ A2 }} / {{ A1 }})</small>
      </td>
      <td>
        <span>{{ calc_eff_inc(B1, B2).toFixed(0) }}%</span>
        <br />
        <small>({{ B2 }} / {{ B1 }})</small>
      </td>
    </tr>
    <tr>
      <th>{{ keys.fpd }}<br />improvement</th>
      <td>
        <span>{{ a_fpd_imp().toFixed(2) }}%</span>
        <br />
        <small>(1/{{ A1 }} – 1/{{ A2 }})</small>
      </td>
      <td>
        <span>{{ b_fpd_imp().toFixed(2) }}%</span>
        <br />
        <small>(1/{{ B1 }} – 1/{{ B2 }})</small>
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
          fpd: this.metric ? 'L/km' : 'Gal/mi',
          unitF: this.metric ? 'Ltr' : 'Gal',
          unitD: this.metric ? 'km' : 'mile',
        };
      },
      winner() {
        if (!this.ab_pct_diff()) return '';
        return this.ab_pct_diff() > 0 ? 'B' : 'A';
      },
    },
    watch: {
      A1() {
        this.A1 = keepLessThan(this.A1, this.A2);
      },
      B1() {
        this.B1 = keepLessThan(this.B1, this.B2);
      },
      A2() {
        this.A2 = keepMoreThan(this.A2, this.A1);
      },
      B2() {
        this.B2 = keepMoreThan(this.B2, this.B1);
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
