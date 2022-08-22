<script setup lang="ts">
    import { reactive } from 'vue';
    import lib from './libs/units.js';
    import SvgArea from './components/Svg/SvgArea.vue';

    const log = console.log;
    const style1 = 'fill: red; opacity: 0.7;';
    const style2 = 'fill: blue; opacity: 0.7;';

    const list = reactive([
        { id: 'Wide', height: 33, width: 99, style: style1 },
        { id: 'Tall', height: 99, width: 33, style: style2 },
    ]);

    const moveItem = (arr, i1, i2) => arr.splice(i2, 0, arr.splice(i1, 1)[0]);

    function hoistElement(arr, item) {
        let idx1 = arr.indexOf(item);
        let idx2 = arr.length;
        // foremost? bury!
        if (idx1 + 1 === idx2) idx2 = 0;

        moveItem(arr, idx1, idx2);
    }

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
        <h1>AreaPage!</h1>
        <pre>{{ lib }}</pre>
        <SvgArea width="500" height="250" @picked="picked" :list="list"></SvgArea>
    </div>
</template>

<style>
    #AreaPage {
        background-color: #ffe;
    }
</style>
