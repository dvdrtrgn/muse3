<template>
  <div id="nav">
    <nav v-for="(route, i) in routes" :key="i">
      <router-link :to="route.path">{{ route.name }}</router-link>
      <span v-show="i < routes.length - 1"> | </span>
    </nav>
  </div>
  <router-view />
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {};
    },
    mounted() {},
    computed: {
      routes() {
        return this.$router.options.routes;
      },
    },
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  #nav nav {
    display: inline;
  }
</style>
