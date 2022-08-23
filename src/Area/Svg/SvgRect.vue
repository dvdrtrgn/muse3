<script setup>
    import { computed, ref, reactive, onUpdated } from 'vue';
    import { useDraggable } from '@vueuse/core';
    import { minmidmax, rectVals } from '../lib/rectHelp';

    defineProps(['width', 'height', 'fill', 'x', 'y', 'style', 'id', 'top']);
    const emits = defineEmits(['picked']);

    const rect$ = ref(null);
    const Rect = reactive({ x: 0, y: 0 });

    const { x: dragX, y: dragY } = useDraggable(rect$, {
        initialValue: { x: 0, y: 0 },
        preventDefault: true,
    });
    const picked = (evt) => emits('picked', evt);

    onUpdated(() => {
        let vals = rectVals(rect$.value);
        let zoom = vals.z;
        let centerW = vals.vw / 2 / zoom;
        let centerH = vals.vh / 2 / zoom;
        Rect.x = minmidmax(0, (dragX.value - vals.vl) / zoom, vals.pw) - centerW;
        Rect.y = minmidmax(0, (dragY.value - vals.vt) / zoom, vals.ph) - centerH;
    });
</script>

<template>
    <rect
        @dblclick="picked"
        :_="dragX || dragY"
        ref="rect$"
        :id="id"
        :x="Rect.x"
        :y="Rect.y"
        :width="width"
        :height="height"
        :style="style"
        :top="top"
    ></rect>
    <text :x="Rect.x + 2" :y="Rect.y + 12" style="">{{ id }}</text>
</template>
