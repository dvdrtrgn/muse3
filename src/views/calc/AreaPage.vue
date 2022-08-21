<script lang="ts">
    import lib from './libs/units.js';
    import RectSvg from './components/RectSvg.vue';

    export default {
        name: 'AreaPage',
        data() {
            return {
                lib,
                pxRatio: 1, // 1 meter... vary for zoom
                list: [{ props: { id: 'a', width: 99 } }],
            };
        },
        mounted() {
            console.log(lib);
        },
        components: { RectSvg },
    };
</script>

<template>
    <div id="AreaPage">
        <h1>AreaPage!</h1>
        <pre>{{ lib }}</pre>
        <svg id="Svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <RectSvg v-for="item in list" :key="item.props.id" v-bind="item.props"></RectSvg>
        </svg>
    </div>
</template>

<style>
    #Name {
        background-color: azure;
    }
    #Svg {
        outline: 1px solid red;
        outline-offset: -1px;
        position: relative;
    }
    #Div {
        background-color: pink;
        position: fixed;
        touch-action: none;
    }
</style>
