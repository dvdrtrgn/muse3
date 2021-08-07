<template>
  <p>
    <label> Distance <input type="number" v-model="distance" /> miles</label>
  </p>
  <p>
    <label> Price per gallon $ <input type="number" v-model="price" /> </label>
  </p>
  <table>
    <tr>
      <th></th>
      <th>Left</th>
      <th>Right</th>
    </tr>
    <tr>
      <td>Before</td>
      <td><CarCalc :mpg="leftBefore" :stats="stats"></CarCalc></td>
      <td><CarCalc :mpg="rightBefore" :stats="stats"></CarCalc></td>
    </tr>
    <tr>
      <td>After</td>
      <td><CarCalc :mpg="leftAfter" :stats="stats"></CarCalc></td>
      <td><CarCalc :mpg="rightAfter" :stats="stats"></CarCalc></td>
    </tr>
    <tr>
      <td>Savings</td>
      <td><CarCalc :mpg="leftDiff" :stats="stats"></CarCalc></td>
      <td><CarCalc :mpg="rightDiff" :stats="stats"></CarCalc></td>
    </tr>
  </table>
</template>

<script>
  import CarCalc from './components/CarCalc.vue';

  export default {
    name: 'Cars',
    components: { CarCalc },
    data() {
      return {
        leftAfter: 35,
        rightAfter: 10,
        leftBefore: 25,
        rightBefore: 8,
        distance: 50,
        price: 2,
      };
    },
    methods: {},
    computed: {
      leftDiff() {
        return this.leftAfter - this.leftBefore;
      },
      rightDiff() {
        return this.rightAfter - this.rightBefore;
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
  td {
    padding: 0.5em;
  }
  input {
    font-size: 1rem;
    text-align: center;
    width: 3rem;
  }
</style>
