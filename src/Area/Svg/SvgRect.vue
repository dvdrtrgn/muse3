<script setup>
    import { ref, reactive, onUpdated } from 'vue';
    import { useDraggable } from '@vueuse/core';
    import { minmidmax, rectVals } from './rectHelp';

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
        const vals = rectVals(rect$.value);
        Rect.x = minmidmax(0, (dragX.value - vals.l) / vals.z, vals.w);
        Rect.y = minmidmax(0, (dragY.value - vals.t) / vals.z, vals.h);
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
