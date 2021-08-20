<template>
  <h1>Take a fresh 100g tomato...</h1>
  <h2 v-if="!accepted">
    It’s approximately <span class="red">99%</span>&nbsp;water!
  </h2>

  <div :style="`height: ${size * 1.2}px`">
    <label for="Guess">
      <TomatoSvg :width="size" :height="size" :reveal="fill" />
    </label>

    <h3 id="Right" class="red" v-if="isCorrect">HALF<br>IS RIGHT</h3>
  </div>

  <div id="Challenge">
    <p v-if="!accepted || isCorrect">
      Guess the mass, when dehydrated to 98% water:
    </p>

    <div v-if="!accepted">
      <button @click="accepted = true">Accept Challenge</button>
    </div>

    <div v-if="accepted">
      <h3 v-if="!isCorrect">
        Adjust water to
        <span class="red">98%</span> of the total&nbsp;mass:
      </h3>
      <TomatoCalc @pubMass="setFill" :hint="hint" />

      <button v-if="!isCorrect" @click="tryAnswer">{{ hintText }}</button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import TomatoCalc from './components/TomatoCalc.vue';
  import TomatoSvg from './components/TomatoSvg.vue';

  export default {
    name: 'Tomato',
    components: {
      TomatoCalc,
      TomatoSvg,
    },
    data() {
      return {
        accepted: false,
        fill: 0,
        hint: 0,
        size: 150,
      };
    },
    methods: {
      finish() {
        this.fill = 49;
        this.hint = 4;
      },
      setFill(num) {
        this.fill = num;
      },
      tryAnswer() {
        this.hint++;
      },
    },
    computed: {
      isCorrect() {
        let rez = this.fill === 49;
        if (rez) this.finish();
        return rez;
      },
      hintText() {
        let rez = 'Check';

        if (this.hint === 1) rez = 'Hint (2)';
        if (this.hint === 2) rez = 'Last hint (1)';
        if (this.hint === 3) rez = 'Answer';

        return rez;
      },
    },
  };
</script>

<style lang="scss">
  #Tomato {
    #Right {
      line-height: 1;
      margin: 0;
      position: relative;
      top: -60%;
    }
    .red {
      color: #b00;
    }
  }
</style>
