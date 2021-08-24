<template>
  <div class="tidy">
    <h1>Round-trip flight...</h1>
    <p>
      Wind can only help going one way.
      Consider these variables...
      <br> distance {{ distance }} / speed {{ topSpeed }}
      <br> {{ distance / topSpeed }} hours (one way)
    </p>

    <h2 class="full">
      Best travel time:
      <b>{{ timeNormal.toLocaleString() }}</b>&nbsp;hours
    </h2>

    <hr />

    <label> Distance <input type="number" v-model.number="distance" /> </label>
    <label> Speed <input type="number" v-model.number="topSpeed" /> </label>
    <label> Wind <input type="number" v-model.number="wind" /> </label>

    <div class="full">
      Top speeds (with wind) to/from:
      <b>{{ speedTo }}</b>/<b>{{ speedFro }}</b>
    </div>
    <div class="full">
      Time to/from:
      <b>{{ timeTo.toLocaleString() }}</b> +
      <b>{{ timeFro.toLocaleString() }}</b>&nbsp;hours
    </div>
    <h2 class="full">
      Adjusted: <b>{{ timeTotal.toLocaleString() }}</b>&nbsp;hours
    </h2>

    <hr>

    <h3 class="full">
      Increased by: <b>{{ (timeTotal - timeNormal).toLocaleString() }}</b>&nbsp;hours
    </h3>
    <p>
      <span v-if="!played">
        Try a wind speed close to the top speed! <br />
      </span><span v-else>
        Increase the wind speed even higher. <br />
        Return time is drastically affected!
      </span>
      <br />
      <button v-show="played < 2" @click="playHardWind">Bad Wind</button>
    </p>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        wind: 50,
        topSpeed: 250,
        distance: 1500,
        played: 0,
      };
    },
    methods: {
      realityCheck() {
        if (this.wind > this.topSpeed) this.wind = this.topSpeed;
      },
      playHardWind() {
        if (this.played) {
          this.wind = this.topSpeed;
        } else {
          this.wind = this.topSpeed - 100;
        }
        this.played++;
      },
    },
    computed: {
      speedTo() {
        return this.topSpeed + this.wind;
      },
      speedFro() {
        return this.topSpeed - this.wind;
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
        return this.distance / this.topSpeed * 2;
      },
    },
    watch: {
      topSpeed() {
        this.realityCheck()
      },
      wind() {
        this.realityCheck()
      },
    }
  };
</script>

<style lang="scss">
  #Velo {
    zoom: 0.9;
    b {
      font-weight: bolder;
    }
    hr {
      border-style: ridge;
    }
  }
</style>
