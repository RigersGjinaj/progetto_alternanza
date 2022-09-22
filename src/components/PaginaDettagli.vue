<template>
  <div v-for="movie in movies" :key="movie.id">
    <h1 class="titolo">{{ movie.title }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: [],
      idFilm: this.$route.params.movie,
    };
  },
  methods: {
    async getMovies() {
      this.movies = await this.fetcher("movie/{idFilm}");
      console.log(this.movies);
      console.log(this.$route.params.movie);
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
}
</style>
