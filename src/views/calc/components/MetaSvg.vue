<template>
  <g id="Meta">
    <line y1="0" y2="0" :x1="-offset" :x2="size - offset"></line>
    <line x1="0" x2="0" :y1="-offset" :y2="size - offset"></line>
    <text x="-87" y="-90">-100</text>
    <text x="-5" y="-3">0</text>
    <text x="90" y="97">100</text>
  </g>
</template>

<script>
  import { defineComponent } from '@vue/runtime-core';

  export default defineComponent({
    props: ['size', 'offset'],
  });
</script>

<style lang="scss">
  line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  text {
    font-size: 10px;
    text-anchor: middle;
  }
</style>
