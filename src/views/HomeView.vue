<template>
  <h1 v-if="this.$root.selectedLanguage == 'it'" class="titolo">
    Film migliori
  </h1>
  <h1 v-else class="titolo">Top rated movies</h1>
  <home-comp :vediDettagli="vediDettagliFilm" :displays="movies"></home-comp>
  <hr class="linea" />
  <h1 v-if="this.$root.selectedLanguage == 'it'" class="titolo">
    Serie TV migliori
  </h1>
  <h1 v-else class="titolo">Top rated TV series</h1>
  <home-comp :vediDettagli="vediDettagliTV" :displays="tvs"></home-comp>
</template>

<script>
import HomeComp from "@/components/HomeComp.vue";
export default {
  mounted() {
    this.getMovies();
    this.getTv();
    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getMovies();
        this.getTv();
      },
      { immediate: true }
    );
  },
  components: { HomeComp },
  data() {
    return {
      movies: [],
      tvs: [],
    };
  },
  methods: {
    async getMovies() {
      this.movies = await this.fetcher("movie/top_rated");
    },
    async getTv() {
      this.tvs = await this.fetcher("tv/top_rated");
    },
    vediDettagliFilm(id) {
      this.$router.push({ name: "paginaFilm", params: { movie: id } });
    },
    vediDettagliTV(id) {
      this.$router.push({ name: "paginaTv", params: { tv: id } });
    },

    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = this.$root.selectedLanguage || "it";
      options.page = this.movies.page;
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
.linea {
  color: black;
  height: 4px;
}
.card {
  width: 200px;
  height: 300px;
}
.distanza {
  margin-top: 20px;
  margin-bottom: 20px;
}
.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}
</style>
