<template>
  <h1 class="titolo">{{ tv.name }}</h1>
  <div class="parent flex-parent">
    <div class="child flex-child">
      <img
        :src="`https://image.tmdb.org/t/p/original` + tv.poster_path"
        :alt="tv.title"
        class="img"
      />
    </div>
    <div class="child flex-child riquadro">
      <h5 class="titolo">Trama:</h5>
      <p class="overview">{{ tv.overview }}</p>
      <h5 class="titolo">Data di rilascio:</h5>
      <p class="overview">{{ tv.first_air_date }}</p>
      <h5 class="titolo">Voto medio:</h5>
      <p class="overview">
        {{ tv.vote_average }} <br />
        voti totali: {{ tv.vote_count }}
      </p>
      <button type="button" class="btn btn-danger">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getTv();
  },
  data() {
    return {
      tv: {},
    };
  },
  methods: {
    async getTv() {
      this.tv = await this.fetcher("tv/" + this.$route.params.tv);
    },
    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = "it-IT";
      const queryParams = "?" + new URLSearchParams(options).toString();
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/" + url + queryParams
        );
        return await res.json();
      } catch (message) {
        return console.error(message);
      }
    },
  },
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}
.img {
  width: 400px;
  height: 550px;
  border: 3px solid white;
  border-radius: 10px;
  margin-bottom: 10px;
}
.overview {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
}

.parent {
  padding: 1rem;
}
.child {
  padding: 1rem;
  width: 400px;
  height: 550px;
}
.flex-parent {
  display: flex;
}
.flex-child {
  flex: 1;
}
.riquadro {
  width: 400px;
  height: 550px;
  border: 3px solid white;
  border-radius: 10px;
  margin-top: 16px;
}
</style>
