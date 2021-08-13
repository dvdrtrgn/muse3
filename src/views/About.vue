<template>
  <div class="about"></div>
  <h1>About</h1>
  <div id="Range" class="tidy">
    <h2>Demo Range</h2>
    <div class="flex line">
      <div>
        Set spread...
        <div>
          <label>
            min <input v-model.number="spread.min" type="number" />
          </label>
          <label>
            max <input v-model.number="spread.max" type="number" />
          </label>
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
  </div>

  <div id="Normal" class="tidy">
    <h2>Demo Normal</h2>
    <div class="flex line">
      <div>
        Set integer...
        <label>
          abs <input v-model.number="integer.abs" type="number" />
        </label>
        <label>
          rel <input v-model.number="integer.rel" type="number" step="0.1" />
        </label>
        <label v-show="!integer.valid">
          rescale
          <input @click="integer.rescale" type="button" value="scale" />
        </label>
      </div>
      <div>
        <h3>Properties:</h3>
        <p><b>abs:</b> {{ integer.abs.toLocaleString() }}</p>
        <p><b>rel:</b> {{ integer.rel.toLocaleString() }}</p>
        <hr />
        <p :class="{ error: !integer.valid }">
          <b>valid:</b> {{ integer.valid }}
        </p>
        <p><b>over:</b> {{ integer.over }}</p>
        <p><b>under:</b> {{ integer.under }}</p>
      </div>
    </div>
  </div>

  <div id="Watch">
    Watch (watcher)
    <p>{{ watcher.lastpoint }}</p>
    <p>{{ watcher.direction }}</p>
  </div>
</template>

<script>
  import { defineComponent, onUpdated, reactive } from 'vue';
  import Range from '../libs/range-tuple.js';
  import Normal from '../libs/normal-num.js';
  import MouseWatch from '../libs/mouse-watch.js';

  Object.assign(window, {
    Range,
    Normal,
  });

  export default defineComponent({
    setup() {
      let spread = reactive(new Range());
      let integer = reactive(new Normal(spread));
      let watcher = MouseWatch('#Watch');

      integer.abs = 0;
      console.log({ integer, spread });

      onUpdated(() => {});

      return {
        spread,
        integer,
        watcher,
      };
    },
    mounted() {
      this.watcher.bind();
    },
    beforeUnmount() {
      this.watcher.unbind();
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
    h3,
    p {
      margin: 0;
    }
    label {
      display: block;
      margin: 1rem;
    }
    input[type='number'] {
      font-size: 1.5rem;
      text-align: center;
      width: 3em;
    }
  }
</style>
