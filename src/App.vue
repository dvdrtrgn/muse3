<script>
    import { defineComponent } from 'vue';
    import NavBar from './components/NavBar.vue';

    export default defineComponent({
        components: { NavBar },
        setup() {
            return {};
        },
        mounted() {},
    });
</script>

<template>
    <NavBar />
    <div :id="$route.name">
        <router-view />
    </div>
</template>

<style lang="scss">
    body {
        margin: 0;
    }
    #App {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #2c3e50;
        text-align: center;
    }
</style>
