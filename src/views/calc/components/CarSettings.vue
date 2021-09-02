<template>
  <table>
    <tr>
      <th>
        Metric
        <input type="checkbox" v-model="metric" />
      </th>
      <td>
        Distance ({{ keys.unitD }})
        <input class="number" type="number" v-model="distance" />
      </td>
      <td>
        Price per ({{ keys.unitF }}) $
        <input class="number" type="number" v-model="price" />
      </td>
    </tr>
  </table>
</template>

<script>
  import pluckFrom from '../libs/pluckFrom.js';

  export default {
    props: ['fromParent'],
    data() {
      let list = this.fromParent.split(',');
      return pluckFrom(this.$parent, ...list);
    },
    mounted() {
      console.log(this.fromParent);
    },
  };
</script>

<style lang="scss"></style>
