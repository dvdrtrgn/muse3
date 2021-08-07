<template>
  <label>
    scale:
    <input type="number" step="0.1" v-model.number="scaleX" />
    <input type="number" step="0.1" v-model.number="scaleY" />
  </label>
  <label>
    skew:
    <input type="number" step="0.1" v-model.number="skewX" />
    <input type="number" step="0.1" v-model.number="skewY" />
  </label>
  <label>
    trans:
    <input type="number" step="10" v-model.number="transX" />
    <input type="number" step="10" v-model.number="transY" />
  </label>
  <label>
    transform origin center
    <input type="checkbox" v-model="checkbox" />
  </label>
  <label>
    size:
    <input type="number" step="10" v-model.number="size" />
  </label>
  <label>
    transform axis center
    <input type="number" step="0.1" v-model="adjust" />
  </label>

  <p>{{ matrix }}</p>
  <p>{{ dematrix }}</p>

  <div></div>
  <svg
    :viewBox="vbox"
    :transform-origin="tranny"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text style="text-anchor: middle; font-size: 10px;" x="-5" y="-3">0</text>
    <text style="text-anchor: middle; font-size: 10px;" x="90" y="97">100</text>
    <line style="stroke: #ccc;" x1="-100" y1="0" x2="100" y2="0"></line>
    <line style="stroke: #ccc;" x1="0" y1="-100" x2="0" y2="100"></line>

    <g :transform="matrix" :transform-origin="tranny">
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        style="fill: rgba(0,0,0,0.2)"
      ></rect>
    </g>
    <g :transform="matrix" :transform-origin="tranny">
      <rect
        x="0"
        y="0"
        width="50"
        height="50"
        style="fill: rgba(0,0,0,0.4)"
      ></rect>
    </g>
  </svg>
</template>

<script>
  import dematrix from './components/dematrix.js';
  window.dematrix = dematrix;

  export default {
    data() {
      return {
        scaleX: 1,
        scaleY: 1,
        skewX: -1,
        skewY: 1,
        transX: -50,
        transY: -50,
        checkbox: false,
        size: 200,
        adjust: 0,
      };
    },
    methods: {},
    computed: {
      tranny() {
        return this.checkbox ? 'center center' : '';
      },
      matrix() {
        let o = this;
        let m = `${o.scaleX}, ${o.skewY}, ${o.skewX}, ${o.scaleY}, ${o.transX}, ${o.transY}`;
        return `matrix(${m})`;
      },
      dematrix() {
        return dematrix.parse(this.matrix);
      },
      offset() {
        return this.size * this.adjust;
      },
      vbox() {
        return `${this.offset} ${this.offset} ${this.size} ${this.size}`;
      },
    },
  };
  /*
  {{ dematrix.parse('matrix(1, 2, 3, 4, 5, 6)') }}
    matrix(a, b, c, d, tx, ty)
    is a shorthand for
    matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1).
  */
</script>

<style>
  svg {
    border: 1px solid red;
  }
  label {
    display: block;
  }
  input[type='number'] {
    font-size: 1rem;
    width: 5rem;
    text-align: right;
  }
</style>
