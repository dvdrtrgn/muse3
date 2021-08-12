<template>
  <div class="about"></div>
  <div id="Range">
    <h1>Range</h1>
    <div class="flex line">
      <div>
        Set range:
        <div>
          <label>
            <input v-model.number="range.min" type="number" />
            min
          </label>
          <label>
            <input v-model.number="range.max" type="number" />
            max
          </label>
        </div>
      </div>
      <div>
        Properties:
        <p>( {{ range.min }} .. {{ range.max }} )</p>
        <p><b>delta:</b> {{ range.delta }}</p>
        <p :class="{ error: !range.valid }"><b>valid:</b> {{ range.valid }}</p>
      </div>
      <div>
        Derive:
        <label>
          <input v-model.number="norm" type="number" />
          <br />Normalized:
          {{ range.calcNorm(norm).toLocaleString() }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onUpdated, reactive, ref } from 'vue';
  import Range from '../libs/range';
  window.Range = Range;

  export default defineComponent({
    setup() {
      let range = reactive(new Range());
      let norm = ref(0);
      console.log('range', range);
      onUpdated(() => {
        // console.log('range', range);
      });
      return {
        range,
        norm,
      };
    },
  });
</script>

<style lang="scss">
  .flex {
    display: flex;
    justify-content: center;
  }
  .line {
    justify-content: space-around;
    > * {
      border: 1px solid silver;
      padding: 1em;
    }
  }
  .error {
    color: red;
  }
  #Range {
    label {
      display: block;
      margin: 1rem;
    }
    input {
      font-size: 2rem;
      text-align: center;
      width: 3em;
    }
  }
</style>
