<template>
  <p v-if="$route.name == 'Calc'">
    Choose from one of the larks above
  </p>
  <router-view></router-view>
</template>
