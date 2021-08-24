<template>
  <h1>Percents</h1>

  <div class="tidy">
    <h2>Formation 1</h2>
    <p>
      What percentage (X) of A do you need to get B?
      <br>
      <i>What percent of {{ f1_a }} is {{ f1_b }}? </i>
    </p>
    <label>X<input type="number" v-model="f1_x" disabled/></label>% of
    <label>A<input type="number" v-model="f1_a"/></label> is
    <label>B<input type="number" v-model="f1_b"/></label>?
    <p>
      Divide the number (B) that you want to turn into a percentage by the whole (A)...
      ({{ f1_b }}/{{ f1_a }})*100
    </p>
  </div>

  <div class="tidy">
    <h2>Formation 2</h2>
    <p>
      Percent A of what number (X) results in B?
      <br>
      {{ f2_a }} percent of what is {{ f2_b }}?
    </p>
    <label>A<input type="number" v-model="f2_a"/></label>% of
    <label>X<input type="number" v-model="f2_x" disabled/></label> is
    <label>B<input type="number" v-model="f2_b"/></label>?
    <p>
      Divide the result number (B) by the percentage (A)...
      ({{ f2_b }}/{{ f2_a }})*100
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        f1_a: 5,
        f1_b: 2,
        f2_a: 45,
        f2_b: 9,
      };
    },
    computed: {
      f1_x() {
        let rez = this.f1_b / this.f1_a * 100;
        return rez.toLocaleString();
      },
      f2_x() {
        let rez = this.f2_b / this.f2_a * 100;
        return rez.toLocaleString();
      },
    },
  };
</script>

<style></style>
