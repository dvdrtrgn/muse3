<template>
  <div class="flex" v-if="hint < 4">
    <label
      >Water mass <br />
      <input
        id="Guess"
        class="big"
        type="number"
        v-model.number="massA"
        max="99"
        min="1"
      />
      <br />
      gram(s) <br />
      <span v-if="hint > 2" class="hint">{{ calcA() }}</span>
    </label>
    <label>
      Vitamins, etc <br />
      <input class="big" v-model.number="massB" disabled />
      <br />
      gram(s) <br />
      <span v-if="hint > 1" class="hint">{{ calcB() }}</span>
    </label>
  </div>
  <div class="hint" v-if="hint > 0">Total mass = {{ mass }}g</div>
</template>

<script>
  export default {
    props: {
      hint: {
        type: Number,
      },
    },
    data() {
      return {
        massA: 99,
        massB: 1,
      };
    },
    emits: ['pubMass'],
    updated() {
      if (this.hint > 3) this.massA = 49;
    },
    methods: {
      calcA() {
        return this.calcTotal(this.massA);
      },
      calcB() {
        return this.calcTotal(this.massB);
      },
      calcTotal(num) {
        let rez = (num / this.mass) * 100;
        return `${rez.toFixed(2)}%`;
      },
    },
    computed: {
      ratio() {
        return this.massB / this.massA;
      },
      mass() {
        this.$emit('pubMass', this.massA);
        return 0 + this.massB + this.massA;
      },
    },
  };
</script>

<style>
  label {
    display: block;
    margin: 1rem;
  }
  input {
    text-align: center;
    width: 2em;
  }
  .big {
    font-size: 2rem;
  }
  .flex {
    background-color: #cfeacc;
    display: flex;
    justify-content: center;
  }
  .hint {
    color: gray;
    line-height: 2;
  }
</style>
