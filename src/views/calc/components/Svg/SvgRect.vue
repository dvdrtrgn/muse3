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

    function picked($event) {
        emits('picked', $event.target.id);
    }

    onUpdated(() => {
        const vals = rectVals(rect$.value);
        Rect.x = minmidmax(0, (dragX.value - vals.l) / vals.z, vals.w);
        Rect.y = minmidmax(0, (dragY.value - vals.t) / vals.z, vals.h);
    });
</script>

<template>
    <text :x="Rect.x + 1" :y="Rect.y + 10" style="font-size: 0.5rem">{{ id }}</text>
    <rect
        @click="picked"
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
</template>
