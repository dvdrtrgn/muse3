<template>
  <slot />
  <table>
    <tr>
      <td>{{ mpg }}mpg</td>
      <td>${{ cost }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: ['mpg', 'stats'],
    data() {
      return {};
    },
    computed: {
      gallons() {
        return this.stats.distance / this.mpg;
      },
      cost() {
        return (this.stats.price * this.gallons).toFixed(2);
      },
    },
  };
</script>

<style scoped>
  td {
    border: 1px solid gray;
  }
</style>
