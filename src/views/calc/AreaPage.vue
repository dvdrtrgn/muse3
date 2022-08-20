<script>
    import lib from './libs/units.js';

    export default {
        name: 'AreaPage',
        setup() {},
        data() {
            return {
                lib,
                pxRatio: 1, // 1 meter... vary for zoom
            };
        },
        mounted() {
            console.log(lib);
        },
    };
</script>

<template>
    <div id="AreaPage">
        <h1>AreaPage!</h1>
        <pre>{{ lib }}</pre>
    </div>
</template>

<style>
    #Name {
        background-color: azure;
    }
</style>
