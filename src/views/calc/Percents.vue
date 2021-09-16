<template>
  <h1>Percents</h1>
  <pre>
TERMS:
Dividend / Divisor = Quotient
Multiplier * Multiplicand = Product
  </pre>

  <div class="tidy">
    <h2>Formation 1</h2>
    <i>What percent of {{ f1_a }} is {{ f1_b }}? </i>
    <p>What [X] percentage of A do you need to get B?</p>

    <label>X%<input type="number" disabled :value="num(f1_x)"/></label> of
    <label>A<input type="number" v-model.number="f1_a"/></label> is
    <label>B<input type="number" v-model.number="f1_b"/></label>?

    <div class="flex">
      <p class="tidy">
        <b>“Start with 100”</b>
        <br />
        Divide 100 by the quotient [A/B] <br />
        100 / ({{ f1_a }}/{{ f1_b }}) = {{ f1_x2 }}
      </p>
      <p class="tidy">
        <b>“Reverse quotient”</b>
        <br />
        Divide [B] by what you want as a percentage, [A] <br />
        {{ f1_b }}/{{ f1_a }} * 100 = {{ f1_x }}
      </p>
    </div>
  </div>

  <div class="tidy">
    <h2>Formation 2</h2>
    <i>{{ f2_a }} percent of what is {{ f2_b }}? </i>
    <p>Percent A of what [X] results in B?</p>

    <label>A%<input type="number" v-model.number="f2_a"/></label>
    of
    <label>X<input type="number" disabled :value="f2_x"/></label>
    is
    <label>B<input type="number" v-model.number="f2_b"/></label>?

    <div class="flex">
      <p class="tidy">
        Divide the result [B] number by the percentage [A]...
        {{ f2_b }}/{{ f2_a }} <small>*100</small>
      </p>
    </div>
  </div>

  <div class="tidy">
    <h2>Formation 3</h2>
    <p>How do you calculate a percentage difference?</p>

    <label>A<input type="number" v-model.number="f3_a"/></label>
    and
    <label>B<input type="number" v-model.number="f3_b"/></label>
    are
    <label>X%<input type="number" disabled :value="f3_x"/></label>

    <div class="flex">
      <p class="tidy">
        Difference [B-A] divided by average [(A+B)/2]...
        {{ f3_b - f3_a }}/{{ (f3_a + f3_b) / 2 }} <small>*100</small>
      </p>
    </div>
  </div>

  <p>
    <a
      target="_blank"
      href="https://www.indeed.com/career-advice/career-development/how-to-calculate-percentage">
      How to calculate percentage
    </a>
  </p>
</template>

<script>
  export default {
    data() {
      return {
        f1_a: 50,
        f1_b: 20,
        f2_a: 45,
        f2_b: 9,
        f3_a: 20,
        f3_b: 30,
      };
    },
    methods: {
      loc(val) {
        let prop = this[val];
        return (prop || val).toLocaleString();
      },
      num(str) {
        let num = String(str).replace(/,/g, '');
        return Number(num);
      },
    },
    computed: {
      f1_x2() {
        let rez = 100 / (this.f1_a / this.f1_b);
        return rez.toLocaleString();
      },
      f1_x() {
        let rez = (this.f1_b / this.f1_a) * 100;
        return rez.toLocaleString();
      },
      f2_x() {
        let rez = (this.f2_b / this.f2_a) * 100;
        return rez.toLocaleString();
      },
      f3_x() {
        let dif = this.f3_b - this.f3_a;
        let avg = (this.f3_a + this.f3_b) / 2;
        let rez = (dif / avg) * 100;
        return rez.toLocaleString();
      },
    },
  };
</script>

<style lang="scss">
  #Percents {
    input:disabled {
      color: black;
    }
  }
</style>
