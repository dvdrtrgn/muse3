<template>
    <b>very under construction</b>
    <p>
        readTransforms<br />
        LargeBox {{ dematrix.readTransform('#LargeBox') }}<br />
        SmallBox {{ dematrix.readTransform('#SmallBox') }}
    </p>
    <svg id="Bounds" :viewBox="vbox">
        <g id="LargeBox" :style="tranny">
            <rect
                :x="placeAt(size1)"
                :y="placeAt(size1)"
                :width="size1"
                :height="size1"
                style="fill: rgba(0, 0, 0, 0.2)"
            ></rect>
            <DotSvg />
        </g>
        <g id="SmallBox" :style="tranny">
            <rect
                class="main"
                :x="placeAt(size2)"
                :y="placeAt(size2)"
                :width="size2"
                :height="size2"
                style="fill: rgba(0, 0, 0, 0.4)"
            ></rect>
            <DotSvg />
        </g>
        <MetaSvg :size="size" :offset="offset" />
        <DotSvg />
    </svg>

    <form>
        <label>
            scale:
            <input type="number" step="0.1" v-model.number="scaleX" />
            <input type="number" step="0.1" v-model.number="scaleY" />
            skew:
            <input type="number" step="0.1" v-model.number="skewX" />
            <input type="number" step="0.1" v-model.number="skewY" />
        </label>
        <label>
            trans:
            <input type="number" step="10" v-model.number="transX" />
            <input type="number" step="10" v-model.number="transY" />
        </label>

        <input type="checkbox" v-model="centerTransform" />center transforms
        <input type="checkbox" v-model="centerBoxes" />center internally
        <input type="checkbox" v-model="byPercent" />size by percent

        <label>
            size bounds:
            <input type="number" step="10" v-model.number="size" />
        </label>
        <label>
            axis bias:
            <input type="number" step="10" v-model="bias" />%
        </label>
    </form>

    <p>{{ matrix }}</p>
    <pre>dematrix {{ dematrix.parse(matrix) }}</pre>
</template>

<script>
    import MetaSvg from './components/MetaSvg.vue';
    import DotSvg from './components/DotSvg.vue';
    import dematrix from './libs/dematrix.js';
    window.dematrix = dematrix;

    export default {
        components: { DotSvg, MetaSvg },
        data() {
            return {
                scaleX: 0.5,
                scaleY: 0.5,
                skewX: 0,
                skewY: 0,
                transX: 0,
                transY: 0,
                size: 200,
                static: 100,
                bias: 0,
                centerTransform: true,
                centerBoxes: false,
                byPercent: false,
            };
        },
        methods: {
            placeAt(num) {
                if (typeof num === 'string') num = parseFloat(num);
                let val = this.centerBoxes ? -num / 2 : 0;

                return val + (this.byPercent ? '%' : 0);
            },
            trannyAll(matrix, origin) {
                let transm = ` transform: ${matrix}; `;
                let transo = ` transform-origin: ${origin}; `;
                return transo + transm;
            },
        },
        computed: {
            tranny() {
                let origin = this.centerTransform ? 'center' : '';
                return this.trannyAll(this.matrix, origin);
            },
            matrix() {
                let o = this;
                let m = [o.scaleX, o.skewY, o.skewX, o.scaleY, o.transX, o.transY];
                return `matrix(${m.join(', ')})`;
            },
            dematrix() {
                return dematrix;
            },
            offset() {
                return this.size * (this.bias / 100);
            },
            vbox() {
                return `${-this.offset} ${-this.offset} ${this.size} ${this.size}`;
            },
            size1() {
                return this.static / 1 + (this.byPercent ? '%' : 0);
            },
            size2() {
                return this.static / 2 + (this.byPercent ? '%' : 0);
            },
        },
    };
</script>

<style lang="scss">
    #Matrix {
        #LargeBox {
            stroke: blue;
        }
        #SmallBox {
            stroke: lime;
        }
        #Bounds {
            margin: auto;
            width: 400px;
        }
        svg {
            border: 1px solid red;
        }
        label {
            display: block;
        }
        input[type='number'] {
            font-size: 1rem;
            text-align: right;
            width: 4rem;
        }
    }
</style>
