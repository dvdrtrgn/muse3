<template>
    <p v-if="$route.name == 'Calc'">Choose from one of the larks above</p>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script>
    export default {
        created() {
            this.$router.push({
                name: 'Area',
            });
        },
    };
</script>

<style lang="scss">
    $break: 40em;

    @mixin break() {
        @media (max-width: $break) and (orientation: portrait) {
            @content;
        }
    }

    input[type='number'],
    .number {
        border-radius: 0.2em;
        font-size: 1.5rem;
        padding: 0.2em 0.3em 0.1em;
        text-align: center;
        width: 3em;
        &:not(:disabled) {
            background: white;
            box-shadow: 0 0 0.2em grey;
            border: 0;
        }
    }

    .tidy {
        border: 1px solid silver;
        padding: 1rem;

        h2,
        h3,
        label {
            margin: 0.5rem;
        }
        input[type='number'] {
            padding-left: 0.5em; /* compensate for incrementor arrows */
        }
        label {
            display: inline-block;
            width: min-content;
        }
        p {
            margin: 0.5em;
            @include break {
                margin: 0.1em;
            }
        }

        .full {
            display: block;
        }
    }

    .flex {
        display: flex;
        justify-content: center;

        @include break {
            flex-wrap: wrap;
        }
    }
</style>
