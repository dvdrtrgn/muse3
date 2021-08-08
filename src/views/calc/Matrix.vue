<template>
  <svg id="Bounds" :viewBox="vbox">
    <g id="Big" :transform="matrix" :transform-origin="tranny">
      <rect
        :x="placeAt(size1)"
        :y="placeAt(size1)"
        :width="size1"
        :height="size1"
        style="fill: rgba(0,0,0,0.2)"
      ></rect>
      <DotSvg />
    </g>
    <g id="Little" :transform="matrix" :transform-origin="tranny">
      <rect
        class="main"
        :x="placeAt(size2)"
        :y="placeAt(size2)"
        :width="size2"
        :height="size2"
        style="fill: rgba(0,0,0,0.4)"
      ></rect>
      <DotSvg />
    </g>
    <MetaSvg :size="size" :offset="offset" />
    <DotSvg />
  </svg>

  <form>
    <label>
      scale:
      <input type="number" step="0.1" v-model.number="scaleX" />
      <input type="number" step="0.1" v-model.number="scaleY" />
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
      <b>center</b>
      transforms:
      <input type="checkbox" v-model="centerTransform" />
      manually:
      <input type="checkbox" v-model="centerBoxes" />
      percent:
      <input type="checkbox" v-model="byPercent" />
    </label>
    <label>
      size:
      <input type="number" step="10" v-model.number="size" />
      bias:
      <input type="number" step="10" v-model="bias" />%
    </label>
  </form>

  <p>#Big {{ getTrans('#Big') }}</p>
  <p>#Little {{ getTrans('#Little') }}</p>
  <p>{{ matrix }}</p>
  <pre>{{ dematrix }}</pre>
</template>

<script>
  import MetaSvg from './components/MetaSvg.vue';
  import DotSvg from './components/DotSvg.vue';
  import dematrix from './components/dematrix.js';
  window.dematrix = dematrix;

  export default {
    components: { DotSvg, MetaSvg },
    data() {
      return {
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        transX: 0,
        transY: 0,
        size: 200,
        static: 100,
        bias: 0,
        centerTransform: true,
        centerBoxes: false,
        byPercent: false,
      };
    },
    methods: {
      getTrans(sel) {
        let ele = document.querySelector(sel);
        if (!ele) return 'foo';
        return window.getComputedStyle(ele).getPropertyValue('transform');
      },
      placeAt(num) {
        if (typeof num === 'string') num = parseFloat(num);
        let val = this.centerBoxes ? -num / 2 : 0;

        return val + (this.byPercent ? '%' : 0);
      },
    },
    computed: {
      tranny() {
        return this.centerTransform ? 'center' : '';
      },
      matrix() {
        let o = this;
        let m = [o.scaleX, o.skewY, o.skewX, o.scaleY, o.transX, o.transY];
        return `matrix(${m.join(', ')})`;
      },
      dematrix() {
        return dematrix.parse(this.matrix);
      },
      offset() {
        return this.size * (this.bias / 100);
      },
      vbox() {
        return `${-this.offset} ${-this.offset} ${this.size} ${this.size}`;
      },
      size1() {
        return this.static / 1.1 + (this.byPercent ? '%' : 0);
      },
      size2() {
        return this.static / 1.8 + (this.byPercent ? '%' : 0);
      },
    },
  };
</script>

<style>
  line {
    stroke: #ccc;
  }
  text {
    font-size: 10px;
    text-anchor: middle;
  }
  #Big {
    stroke: blue;
  }
  #Little {
    stroke: lime;
  }
  #Bounds {
    margin: auto;
    width: 400px;
  }
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
