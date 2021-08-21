<template>
  <p v-if="$route.name == 'Calc'">
    Choose from one of the larks above
  </p>
  <router-view></router-view>
</template>

<style lang="scss">
  .tidy {
    border: 1px solid silver;
    h2,
    h3,
    label {
      display: inline-block;
      margin: 0.5rem;
    }
    input[type='number'] {
      font-size: 1.5rem;
      text-align: center;
      width: 3em;
    }
  }

</style>
