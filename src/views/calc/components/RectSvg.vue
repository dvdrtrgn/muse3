<script setup>
    import { ref, reactive, onUpdated } from 'vue';
    import { useDraggable } from '@vueuse/core';
    import { minmidmax, rectVals } from './rectHelp';
    defineProps(['width', 'height']);
    const rect$ = ref(null);
    const Rect = reactive({ x: 0, y: 0 });
    const log = console.log;

    const { x: dragX, y: dragY } = useDraggable(rect$, {
        initialValue: { x: 0, y: 0 },
        preventDefault: true,
    });

    onUpdated(() => {
        const vals = rectVals(rect$.value);
        Rect.x = minmidmax(0, (dragX.value - vals.l) / vals.z, vals.w);
        Rect.y = minmidmax(0, (dragY.value - vals.t) / vals.z, vals.h);
    });
</script>

<template>
    <rect
        @click="log($event.target.id)"
        :_="dragX || dragY"
        ref="rect$"
        :x="Rect.x"
        :y="Rect.y"
        :width="width"
        :height="height"
        style="fill: red"
    ></rect>
</template>
