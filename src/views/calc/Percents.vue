<template>
  <h1>Percents</h1>

  <div class="tidy">
    <h2>Formation 1</h2>
    <p>
      What percentage (X) of A do you need to get B?
      <i>What percent of {{ f1_a }} is {{ f1_b }}? </i>
    </p>
    <label>X<input type="number" v-model.number="f1_x" disabled/></label>% of
    <label>A<input type="number" v-model.number="f1_a"/></label> is
    <label>B<input type="number" v-model.number="f1_b"/></label>?
    <p>
      Divide the number (B) that you want to turn into a percentage by the whole (A)...
      ({{ f1_b }}/{{ f1_a }})*100
    </p>
  </div>

  <div class="tidy">
    <h2>Formation 2</h2>
    <p>
      Percent A of what number (X) results in B?
      <i>{{ f2_a }} percent of what is {{ f2_b }}? </i>
    </p>
    <label>A<input type="number" v-model.number="f2_a"/></label>% of
    <label>X<input type="number" v-model.number="f2_x" disabled/></label> is
    <label>B<input type="number" v-model.number="f2_b"/></label>?
    <p>
      Divide the result number (B) by the percentage (A)...
      ({{ f2_b }}/{{ f2_a }})*100
    </p>
  </div>

  <div class="tidy">
    <h2>Formation 3</h2>
    <p>
      How do you calculate a percentage difference?
    </p>
    <label>A<input type="number" v-model.number="f3_a"/></label> and
    <label>B<input type="number" v-model.number="f3_b"/></label> are
    <label>X<input type="number" v-model.number="f3_x" disabled/></label>
    <p>
      difference (B-A)/(A/2+B/2) average...({{ (f3_b - f3_a) }}/{{ (f3_a + f3_b) / 2 }})*100
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
        f3_a: 20,
        f3_b: 30,
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
      f3_x() {
        let dif = this.f3_b - this.f3_a;
        let avg = this.f3_a / 2 + this.f3_b / 2;
        let rez = dif / avg * 100;
        return rez.toLocaleString();
      },
    },
  };
</script>

<style></style>
