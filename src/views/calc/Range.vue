<template>
  <h1>Ranged-Normals demo</h1>

  <div class="tidy">
    <h2>Range (tuple)</h2>
    <p>
      A range tuple is a value pair representing a MIN and MAX.
    </p>
    <p>
      Strictly, the minimum can be any number smaller than the maximum.
    </p>
    <div class="flex lined">
      <div>
        <div>
          <p>Set spread...</p>
          <label>
            min <input v-model.number="spread.min" type="number" />
          </label>
          <label>
            max <input v-model.number="spread.max" type="number" />
          </label>
          <br />
          <label>
            strict <input v-model.number="spread.strict" type="checkbox" />
          </label>
        </div>
      </div>
      <div>
        <h3>Properties:</h3>
        <p><b>min:</b> {{ spread.min.toLocaleString() }}</p>
        <p><b>max:</b> {{ spread.max.toLocaleString() }}</p>
        <hr />
        <p :class="{ error: !spread.valid }">
          <b>valid:</b> {{ spread.valid }}
        </p>
        <p><b>delta:</b> {{ spread.delta.toLocaleString() }}</p>
      </div>
    </div>

    <h2>Normal (num)</h2>
    <div class="flex lined">
      <div>
        <p>Set weight...</p>
        <label>
          abs <input v-model.number="weight.abs" type="number" />
        </label>
        <label>
          rel <input v-model.number="weight.rel" type="number" step="0.1" />
        </label>
        <label>
          srel
          (signed&nbsp;normal)
          <input v-model.lazy.number="weight.srel" step="0.1" />
        </label>
        <label v-show="!weight.bounded">
          <input @click="weight.rescale" type="button" value="scale range" />
        </label>
      </div>
      <div>
        <h3>Properties:</h3>
        <p><b>abs:</b> {{ weight.abs.toLocaleString() }}</p>
        <p><b>rel:</b> {{ weight.rel.toLocaleString() }}</p>
        <p><b>srel:</b> {{ weight.srel.toLocaleString() }} (signed)</p>
        <hr />
        <p :class="{ error: !weight.bounded }">
          <b>bounded:</b> {{ weight.bounded }}
        </p>
        <p><b>over:</b> {{ weight.over }}</p>
        <p><b>under:</b> {{ weight.under }}</p>
      </div>
    </div>
    <p>
      Given a range of values (say {{ spread.min.toLocaleString() }} to
      {{ spread.max.toLocaleString() }})...
      <br />
      An absolute value (abs: {{ weight.abs.toLocaleString() }}) also has a
      relative value (rel: {{ weight.rel.toLocaleString() }}) to that range.
    </p>
    <p>
      <i>
        The fraction of the range can be called a “normalized” value. <br />
        Usually the purpose is to clamp it between 0 and 1, inclusive. <br />
        (Or in the case of “signed normal” between -1 and 1.)
      </i>
    </p>
  </div>
</template>

<script>
  import { defineComponent, onUpdated, reactive } from 'vue';
  import Range from './libs/range-tuple.js';
  import Normal from './libs/normal-num.js';

  Object.assign(window, {
    Range,
    Normal,
  });

  export default defineComponent({
    setup() {
      let spread = reactive(new Range(-5, 5));
      let weight = reactive(new Normal(spread));

      weight.abs = 0;
      console.log({ weight, spread });

      onUpdated(() => {});

      return {
        spread,
        weight,
      };
    },
  });
</script>

<style lang="scss">
  #Range {
    .flex {
      display: flex;
      justify-content: center;
    }
    .lined {
      justify-content: space-around;
      > * {
        border: 1px solid silver;
        padding: 1em;
      }
      p {
        margin: 0;
      }
    }
    .error {
      color: red;
    }
  }
</style>
