<template>
  <p v-if="$route.name == 'Calc'">
    Choose from one of the larks above
  </p>
  <router-view></router-view>
</template>

<style lang="scss">
  .tidy {
    border: 1px solid silver;
    padding: 1rem;

    h2, h3, label {
      margin: 0.5rem;
    }
    input[type='number'] {
      font-size: 1.5rem;
      text-align: center;
      width: 3em;
    }
    label {
      display: inline-block;
      width: min-content
    }

    .full {
      display: block;
    }
  }

</style>
