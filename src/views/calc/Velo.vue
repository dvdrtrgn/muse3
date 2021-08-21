<template>
  <h1>Take a Round-trip...</h1>
  <div class="tidy">
    <h2 class="full">
      Base time:
      <b>{{ (timeNormal * 2).toLocaleString() }}</b> hours
      (one-way <b>{{ (timeNormal).toLocaleString() }}</b>)
    </h2>
    <label> Wind <input type="number" v-model.number="wind" /> </label>
    <label> Top Speed <input type="number" v-model.number="speed" /> </label>
    <label> Distance <input type="number" v-model.number="distance" /> </label>
    <label class="full">
      Velocity (with wind) to/from
      <b>{{ speedTo }}</b> /
      <b>{{ speedFro }}</b>
    </label>
    <label class="full">
      Time to/from
      <b>{{ timeTo.toLocaleString() }}</b> + <b>{{ timeFro.toLocaleString() }}</b>
    </label>
    <h2 class="full">
      Adjusted Time: <b>{{ timeTotal.toLocaleString() }}</b> hours
    </h2>
    <p>
      Seems odd, but try a wind speed close to the top speed! <br>
      <button v-if="!played" @click="playHardWind">Bad Wind</button>
      <span v-else>
        See how the return time (from) is drastically affected?
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        wind: 10,
        speed: 100,
        distance: 1000,
        played: false,
      };
    },
    methods: {
      playHardWind() {
        this.wind = this.speed - 10;
        this.played = true;
      },
    },
    computed: {
      speedTo() {
        return this.speed + this.wind;
      },
      speedFro() {
        return this.speed - this.wind;
      },
      timeTo() {
        return this.distance / this.speedTo;
      },
      timeFro() {
        return this.distance / this.speedFro;
      },
      timeTotal() {
        return this.timeTo + this.timeFro;
      },
      timeNormal() {
        return this.distance / this.speed;
      },
    },
  };
</script>

<style lang="scss">
  #Velo {
    b {
      font-weight: bolder;
    }
    .full {
      display: block;
    }
  }
</style>
