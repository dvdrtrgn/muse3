<template>
  <div class="about"></div>
  <h1>About</h1>
  <div id="Range" class="tidy">
    <h2>Range</h2>
    <div class="flex line">
      <div>
        Set spread:
        <div>
          <label>
            min <input v-model.number="spread.min" type="number" />
          </label>
          <label>
            max <input v-model.number="spread.max" type="number" />
          </label>
        </div>
      </div>
      <div>
        <h3>Properties:</h3>
        <p>( {{ spread.min }} .. {{ spread.max }} )</p>
        <p><b>delta:</b> {{ spread.delta }}</p>
        <p :class="{ error: !spread.valid }">
          <b>valid:</b> {{ spread.valid }}
        </p>
      </div>
    </div>
  </div>

  <div id="Normal" class="tidy">
    <h2>Normal</h2>
    <div class="flex line">
      <div>
        Set integer:
        <label>
          raw <input v-model.number="integer.raw" type="number" />
        </label>
      </div>
      <div>
        <h3>Properties:</h3>
        <p><b>value:</b> {{ integer.value.toLocaleString() }}</p>
        <p :class="{ error: !integer.valid }">
          <b>valid:</b> {{ integer.valid }}
        </p>
        <p><b>over:</b> {{ integer.over }}</p>
        <p><b>under:</b> {{ integer.under }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onUpdated, reactive } from 'vue';
  import Range from '../libs/range';
  import Normal from '../libs/normal';

  Object.assign(window, {
    Range,
    Normal,
  });

  export default defineComponent({
    setup() {
      let spread = reactive(new Range());
      let integer = reactive(new Normal(spread));

      integer.raw = 0;
      console.log({ integer, spread });

      onUpdated(() => {});

      return {
        spread,
        integer,
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
  .tidy {
    border: 1px solid silver;
    h2,
    p {
      margin: 0;
    }
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
