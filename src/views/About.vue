<template>
    <div class="about"></div>
    <h1>About</h1>

    <div id="Watch" class="tidy">
        <h2>Watch Mouse</h2>
        <div class="flex line">
            <div class="target" :style="colorBorder(watcher.degree)">
                <p><b>movement</b>: {{ watcher.movement }}</p>
                <p><b>degree</b>: {{ watcher.degree }}</p>
                <p><b>bearing</b>: {{ watcher.bearing }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, onUpdated } from 'vue';
    import MouseWatch from '../libs/mouse-watch.js';

    Object.assign(window, {
        MouseWatch,
    });

    export default defineComponent({
        setup() {
            let watcher = MouseWatch('#Watch .target');

            console.log({ watcher });

            onUpdated(() => {});

            return {
                watcher,
            };
        },
        mounted() {
            this.watcher.bind();
        },
        beforeUnmount() {
            this.watcher.unbind();
        },
        methods: {
            colorBorder(num) {
                let deg = (Number(num) || 0) % 360;
                return `border: 10px solid hsl(${deg}, 99%, 33%)`;
            },
        },
    });
</script>

<style lang="scss">
    #About {
        .target {
            background-color: silver;
            min-width: 50%;
        }
        .flex {
            display: flex;
            justify-content: center;
        }
    }
</style>
