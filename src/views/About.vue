<template>
  <div class="about"></div>
  <div id="Range">
    <h1>Range</h1>
    <div class="flex">
      <label> Min <input v-model.number="range.min" type="number" /> </label>
      <label> Max <input v-model.number="range.max" type="number" /> </label>
      <div class="line">
        <p>delta: {{ range.delta }}</p>
        <p :class="{ error: range.inverted }">inverted: {{ range.inverted }}</p>
        {{ range.min }} .. {{ range.max }}
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onUpdated, reactive } from 'vue';
  import Range from '../libs/range';

  export default defineComponent({
    setup() {
      let range = reactive(new Range(1, 99));

      onUpdated(() => {
        // console.log('range', range);
      });
      return {
        range,
      };
    },
  });
</script>

<style lang="scss">
  .flex {
    display: flex;
    justify-content: center;
  }
  .line > * {
    border: 1px solid silver;
    padding: 1em;
  }
  .error {
    color: red;
  }
  #Range {
    label {
      display: inline-block;
      margin: 1rem;
    }
    input {
      font-size: 2rem;
      text-align: center;
      width: 2em;
    }
  }
</style>
