<script setup lang="ts">
    import { ref } from 'vue';
    import SvgRect from './SvgRect.vue';

    defineProps(['list', 'height', 'width']);

    const top = ref('');
    const log = console.log;
    function picked(id) {
        top.value = id;
        log(top.value);
    }
</script>

<template>
    <div svg-area>
        <h2>SvgArea</h2>
        <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
            <SvgRect
                v-for="item in list"
                @picked="picked"
                :key="item.props.id"
                v-bind="item.props"
                :top="top === item.props.id ? '' : null"
            ></SvgRect>
        </svg>
    </div>
</template>
<style>
    [top] {
        z-index: 9;
    }
</style>
<style lang="scss">
    [svg-area] {
        position: relative;
        svg {
            outline: 1px solid red;
            outline-offset: -1px;
            position: relative;
            &:hover {
                z-index: 2;
            }
        }
        h2 {
            line-height: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
        }
    }
</style>
