<template>
    <p>Stuff that is probably broken</p>
    <router-view></router-view>
</template>

<script>
    export default {
        created() {
            this.$router.push({
                name: 'Matrix',
            });
        },
    };
</script>
