<script>
    import { defineComponent, reactive, Teleport } from 'vue';
    const SIDE = ['', '.top', '.right', '.bottom', '.left'];
    export default defineComponent({
        components: { Teleport },
        setup() {
            const data = reactive({
                clicks: -1,
            });
            return data;
        },
        computed: {
            index() {
                return this.clicks % SIDE.length;
            },
            side() {
                return SIDE[this.index];
            },
        },
        mounted() {
            this.clicks = 0;
        },
        methods: {
            nextSide() {
                this.clicks += 1;
                console.log({ side: this.side });
            },
        },
    });
</script>

<template>
    <Teleport :disabled="!side" :to="side">
        <button @click="nextSide">TELE-PORT</button>
    </Teleport>
</template>

<style lang="scss">
    button {
        background-color: red;
        border-radius: 100%;
        font-weight: bold;
        height: 4em;
        width: 4em;
        aside & {
            border-radius: 10%;
            opacity: 0.5;
        }
        &:hover {
            opacity: 1;
        }
    }
</style>
