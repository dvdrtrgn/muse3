<template>
  <div id="nav">
    <nav v-for="(route, i) in routes" :key="i">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </nav>
  </div>
  <div :id="$route.name">
    <router-view />
  </div>
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

<style lang="scss">
  body {
    margin: 0;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    text-align: center;
  }
  #nav {
    padding: 1rem;
    a {
      color: #2c3e50;
      font-weight: bold;
    }
    a.router-link-exact-active {
      color: #42b983;
    }
    nav {
      border-right: 2px solid silver;
      display: inline;
      line-height: 0;
      padding: 0 0.5em;
      &:last-child {
        border-right: 0;
      }
    }
  }
</style>
