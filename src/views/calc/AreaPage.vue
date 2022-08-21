<script setup lang="ts">
    import lib from './libs/units.js';
    import SvgArea from './components/Svg/SvgArea.vue';

    const style1 = 'fill: red; opacity: 0.5;';
    const style2 = 'fill: blue; opacity: 0.5;';

    const list = [
        { props: { id: 'RedWide', height: 22, width: 99, style: style1 } },
        { props: { id: 'RedTall', height: 99, width: 22, style: style2 } },
    ];

    // return {
    //     lib,
    //     pxRatio: 1, // 1 meter... vary for zoom
    // };
</script>

<template>
    <div id="AreaPage">
        <h1>AreaPage!</h1>
        <pre>{{ lib }}</pre>
        <SvgArea width="500" height="250" :list="list"></SvgArea>
    </div>
</template>

<style>
    #AreaPage {
        background-color: #ffe;
    }
</style>
