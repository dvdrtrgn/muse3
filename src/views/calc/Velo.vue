<template>
  <h1>Take a round-trip flight...</h1>
  <div class="tidy">
    <label> Distance <input type="number" v-model.number="distance" /> </label>
    <label> Speed <input type="number" v-model.number="topSpeed" /> </label>

    <h2 class="full">
      Base travel time:
      <b>{{ (timeNormal * 2).toLocaleString() }}</b> hours
    </h2>
    <label> Wind <input type="number" v-model.number="wind" /> </label>
    <hr />
    <h2 class="full">
      Adjusted Time: <b>{{ timeTotal.toLocaleString() }}</b> hours
    </h2>

    <label class="full">
      Top speeds to/from (with wind):
      <b>{{ speedTo }}</b>/<b>{{ speedFro }}</b>
    </label>
    <label class="full">
      Time to/from:
      <b>{{ timeTo.toLocaleString() }}</b> +
      <b>{{ timeFro.toLocaleString() }}</b> hours
    </label>

    <h3>Seems odd, does it not?</h3>
    <p>
      <span v-if="!played">
        Now try a wind speed close to the top speed! <br />
      </span><span v-else>
        Increase the wind speed even higher. <br />
        See how the return time is drastically affected!
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
        distance: 500,
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
          this.wind = this.topSpeed - 50;
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
        return this.distance / this.topSpeed;
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
    b {
      font-weight: bolder;
    }
    hr {
      border-style: ridge;
    }
    .full {
      display: block;
    }
  }
</style>
