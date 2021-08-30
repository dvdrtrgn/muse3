<template>
  <div id="ABwrap">
    <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
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
      return {};
    },
    methods: {},
    computed: {},
  };
</script>

<style lang="scss">
  #ABwrap {
    background-color: wheat;
  }
  #Car_A1 {
    fill: blue;
    transform: matrix(1, 0, 0, 1, -100, 10);
  }
  #Car_B1 {
    fill: red;
    transform: matrix(-1, 0, 0, 1, +100, 10);
    z-index: var(--foo);
  }
</style>
