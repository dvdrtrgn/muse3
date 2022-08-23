<script setup lang="ts">
    import { ref } from 'vue';
    import SvgRect from './SvgRect.vue';

    defineProps(['list', 'height', 'width']);
    const emits = defineEmits(['picked']);
    const picked = (evt) => emits('picked', evt);
</script>

<template>
    <div svg-area>
        <h2>SvgArea</h2>
        <svg
            :viewBox="`${width / -2} ${height / -2} ${width} ${height}`"
            xmlns="http://www.w3.org/2000/svg"
        >
            <SvgRect
                v-for="item in list"
                @picked="picked(item)"
                :key="item.id"
                v-bind="item"
            ></SvgRect>
        </svg>
    </div>
</template>
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
            text {
                fill: white;
                font-size: 0.7rem;
                pointer-events: none;
                text-shadow: black 0px 1px 2px;
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
