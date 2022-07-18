<script>
    import HelloWorld from '@/components/HelloWorld.vue';
    import TeleBtn from '../components/TeleBtn.vue';

    export default {
        components: { HelloWorld, TeleBtn },
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

<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" @click="showstuff" />
        <HelloWorld v-show="show" msg="Welcome to Your Vue.js App" />
        <footer><a href="..">TOP</a></footer>
        <TeleBtn></TeleBtn>
    </div>
</template>
