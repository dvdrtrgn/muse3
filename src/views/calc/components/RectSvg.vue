<script setup>
    import { ref, reactive, onUpdated } from 'vue';
    import { useDraggable } from '@vueuse/core';

    const el = ref(null);
    const { x: drx, y: dry } = useDraggable(el, {
        initialValue: { x: 0, y: 0 },
        preventDefault: true,
    });
    function midminmax(min = -1, mid = 0, max = 1) {
        return Math.min(Math.max(parseInt(mid), min), max);
    }
    function svgVals(ele) {
        const parent = ele?.viewportElement;
        const rect = parent?.getBoundingClientRect() || { left: 1, top: 1, width: 1 };
        const box = parent?.viewBox?.baseVal || { width: 1 };
        const vals = {
            l: rect.left,
            t: rect.top,
            z: rect.width / box.width,
            w: box.width - ele.width.baseVal.value,
            h: box.height - ele.height.baseVal.value,
        };
        // console.log(vals);
        return vals;
    }

    const svg = reactive({ x: 0, y: 0 });
    function update() {
        const vals = svgVals(el.value);
        svg.x = midminmax(0, (drx.value - vals.l) / vals.z, vals.w);
        svg.y = midminmax(0, (dry.value - vals.t) / vals.z, vals.h);
    }

    onUpdated(update);
</script>

<template>
    <rect
        ref="el"
        class="origin"
        :x="svg.x"
        :y="svg.y"
        :drx="drx"
        :dry="dry"
        width="23"
        height="23"
        style="fill: red"
    ></rect>
</template>
