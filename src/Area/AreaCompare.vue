<script setup lang="ts">
    import { reactive } from 'vue';
    import lib from './lib/unitHelp';
    import SvgArea from './Svg/SvgArea.vue';
    import { hoistElement } from './lib/arrayHelp';

    const style1 = 'fill: red; opacity: 0.7;';
    const style2 = 'fill: blue; opacity: 0.7;';

    const canvas = reactive({ width: 500, height: 250 });

    const list = reactive([
        { id: 'Wide', height: 33, width: 99, style: style1 },
        { id: 'Tall', height: 99, width: 33, style: style2 },
    ]);

    function picked(item) {
        hoistElement(list, item);
    }

    // return {
    //     lib,
    //     pxRatio: 1, // 1 meter... vary for zoom
    // };
</script>

<template>
    <div id="AreaPage">
        <h1>AreaPage</h1>
        <input type="number" step="100" v-model="canvas.width" />
        <input type="number" step="100" v-model="canvas.height" />
        <pre>{{ lib }}</pre>
        <SvgArea
            :list="list"
            :width="canvas.width"
            :height="canvas.height"
            @picked="picked"
        ></SvgArea>
    </div>
</template>

<style>
    #AreaPage {
        background-color: #ffe;
    }
</style>
