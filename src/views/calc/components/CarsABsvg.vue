<template>
  <div id="ABwrap" :style="cssVars">
    <svg viewBox="0 0 500 120">
      <CarSvg :id="`${diff > 0 ? 'A1' : 'B1'}`" />
      <CarSvg :id="`${diff > 0 ? 'B1' : 'A1'}`" />
    </svg>
  </div>
</template>

<script>
  import CarSvg from './CarSvg.vue';

  export default {
    name: 'CarsSvg',
    components: { CarSvg },
    props: ['diff'],
    data() {
      return {
        blue: 'steelblue',
      };
    },
    methods: {},
    computed: {
      size() {
        return (this.diff / -400) + 1;
      },
      cssVars() {
        let size = (this.diff / -400) + 1.2;
        return `--size: ${size};` ;
      },
    },
  };
</script>

<style lang="scss">
  #ABwrap {
    --sizeA: v-bind(size);
    --sizeB1: calc(-1 / var(--size));
    --sizeB2: calc(1 / var(--size));
    background-color: wheat;
    svg {
      overflow: visible;
    }
  }
  #Car_A1 {
    fill: v-bind(blue);
    transform: matrix(var(--sizeA), 0, 0, var(--sizeA), -100, 10);
  }
  #Car_B1 {
    fill: red;
    transform: matrix(var(--sizeB1), 0, 0, var(--sizeB2), +100, 10);
  }
</style>
