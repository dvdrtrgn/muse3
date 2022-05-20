<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" @click="showstuff" />
        <HelloWorld v-show="show" msg="Welcome to Your Vue.js App" />
        <footer><a href="..">TOP</a></footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';

    export default {
        components: {
            HelloWorld,
        },
        data() {
            return {
                show: false,
            };
        },
        methods: {
            showstuff() {
                this.show = !this.show;
            },
        },
    };
</script>
