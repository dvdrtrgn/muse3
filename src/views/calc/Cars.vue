<template>
  <h1>Compare Efficiencies</h1>

  <h2>Adjust distance and price&nbsp;settings:</h2>
  <table>
    <tr>
      <th></th>
      <td>Distance (miles) <input class="editable" v-model="distance" /></td>
      <td>Price per gallon $ <input class="editable" v-model="price" /></td>
    </tr>
  </table>

  <hr />
  <h3>Compare two owners who upgrade their&nbsp;cars...</h3>
  <table>
    <tr></tr>
    <tr>
      <th></th>
      <th>Owner A</th>
      <th>Owner B</th>
    </tr>
    <tr>
      <th>Old car</th>
      <td>
        <input class="editable" v-model="carA1" /> mpg
        <br />
        <span>${{ costAtPer(carA1).toFixed(2) }}</span>
        <i> / {{ gallons(carA1).toFixed(1) }}gal</i>
        <h6>{{ (1 / carA1).toFixed(3) }}gpm</h6>
      </td>
      <td>
        <input class="editable" v-model="carB1" /> mpg
        <br />
        <span>${{ costAtPer(carB1).toFixed(2) }}</span>
        <i> / {{ gallons(carB1).toFixed(1) }}gal</i>
        <h6>{{ (1 / carB1).toFixed(3) }}gpm</h6>
      </td>
    </tr>
    <tr>
      <th>New car</th>
      <td>
        <input class="editable" v-model="carA2" /> mpg
        <br />
        <span>${{ costAtPer(carA2).toFixed(2) }}</span>
        <i> / {{ gallons(carA2).toFixed(1) }}gal</i>
        <h6>{{ (1 / carA2).toFixed(3) }}gpm</h6>
      </td>
      <td>
        <input class="editable" v-model="carB2" /> mpg
        <br />
        <span>${{ costAtPer(carB2).toFixed(2) }}</span>
        <i> / {{ gallons(carB2).toFixed(1) }}gal</i>
        <h6>{{ (1 / carB2).toFixed(3) }}gpm</h6>
      </td>
    </tr>
    <tr>
      <th>Savings</th>
      <td>
        <span> ${{ compareCost(carA1, carA2).toFixed(2) }} </span>
        <i> / {{ compareGals(carA1, carA2).toFixed(1) }}gal </i>
      </td>
      <td>
        <span> ${{ compareCost(carB1, carB2).toFixed(2) }} </span>
        <i> / {{ compareGals(carB1, carB2).toFixed(1) }}gal </i>
      </td>
    </tr>
    <tr>
      <th>Efficiency<br />improvement</th>
      <td>
        <span>{{ percentDiff(carA1, carA2).toFixed(0) }}%</span>
        <br />
        <i>({{ carA2 }} / {{ carA1 }})</i>
      </td>
      <td>
        <span>{{ percentDiff(carB1, carB2).toFixed(0) }}%</span>
        <br />
        <i>({{ carB2 }} / {{ carB1 }})</i>
      </td>
    </tr>
    <tr>
      <th>GPM<br />difference</th>
      <td>
        <span>{{ (1 / carA1 - 1 / carA2).toFixed(3) }}</span>
        <br />
        <h6>1/{{ carA1 }} – 1/{{ carA2 }}</h6>
      </td>
      <td>
        <span>{{ (1 / carB1 - 1 / carB2).toFixed(3) }}</span>
        <br />
        <h6>1/{{ carB1 }} – 1/{{ carB2 }}</h6>
      </td>
    </tr>
  </table>

  <hr />
  <h3>Small improvements to low efficiencies can pay off!</h3>
  <p>
    Owner A’s new car would need over 66mpg to get the same payoff.
  </p>
</template>

<script>
  export default {
    name: 'Cars',
    components: {},
    data() {
      return {
        carA1: 25,
        carA2: 35,
        carB1: 8,
        carB2: 10,
        distance: 44,
        price: 3.98,
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
      leftDiff() {
        return this.carA2 - this.carA1;
      },
      rightDiff() {
        return this.carB2 - this.carB1;
      },
      stats() {
        return {
          distance: this.distance,
          price: this.price,
        };
      },
    },
  };
</script>

<style>
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
    width: 2em;
  }
  h6 {
    margin: 0;
  }

  .editable {
    background: white;
    box-shadow: 0 0 0.2em grey;
    border: 0;
    border-radius: 0.2em;
    line-height: 1;
    padding: 0.2em 0.3em 0;
  }
</style>
