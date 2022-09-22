<template>
  <div class="container text-center">
    <div class="row">
      <div class="col" v-for="tv in tvs.results" :key="tv.id">
        <div class="distanza card text-bg-dark">
          <img
            :src="`https://image.tmdb.org/t/p/original` + tv.poster_path"
            :alt="tv.title"
            class="card grandezza"
            @mouseover="dettagli = true"
            @mouseleave="dettagli = false"
          />
          <div>
            <div v-show="dettagli" class="card-img-overlay">
              <h4 class="titolo">{{ tv.name }}</h4>
              <p class="overview">Voto medio: {{ tv.vote_average }}</p>
              <button
                type="button"
                class="btn btn-secondary bottone"
                @click="vediDettagli"
              >
                Dettagli
              </button>
            </div>
          </div>
        </div>
      </div>
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
      tvs: [],
      dettagli: false,
    };
  },

  methods: {
    async getTv() {
      this.tvs = await this.fetcher("tv/popular");

      console.log(this.tvs);
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

    vediDettagli() {},
  },
};
</script>

<style>
.titolo {
  color: whitesmoke;
}

.card {
  width: 200px;
  height: 300px;
}

.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}

.tiolo {
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.overview {
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 13px;
}

.distanza {
  margin-top: 20px;
  margin-bottom: 20px;
}

.bottone {
  position: absolute;
  bottom: 10px;
  right: 10px;
  left: 10px;
  padding: 10px;
  font-family: monospace;
}
</style>
