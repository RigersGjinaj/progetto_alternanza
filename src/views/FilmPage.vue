<template>
  <div class="container text-center">
    <div class="row">
      <div class="col" v-for="movie in movies.results" :key="movie.id">
        <div class="distanza card text-bg-dark">
          <img
            :src="`https://image.tmdb.org/t/p/original` + movie.poster_path"
            :alt="movie.title"
            class="card grandezza"
            @click="vediDettagli(movie.id)"
          />
          <div v-show="dettagli" class="card-img-overlay"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="btn-group altro" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-primary" @click="mostraAltro">
      Mostra altri film
    </button>
    <button type="button" class="btn btn-primary" @click="mostraMeno">
      Mostra meno film
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMovies();
  },

  data() {
    return {
      movies: [],
      dettagli: false,
    };
  },

  methods: {
    async getMovies() {
      this.movies = await this.fetcher("movie/popular");
      console.log(this.movies);
    },

    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = "it-IT";
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

    vediDettagli(id) {
      this.$router.push({ name: "pagina", params: { movie: id } });
    },
    async getRisultato(search) {
      this.movies = await this.fetcher("search/multi", { query: search });
    },

    mostraAltro() {
      this.movies.page++;
      this.movies.push(this.getMovies());
    },
    mostraMeno() {
      if (this.movies.page == 1) {
        return;
      }
      this.movies.page--;
      this.movies.push(this.getMovies());
    },
  },

  watch: {
    "$route.query.search": {
      handler: function (search) {
        if (search) this.getRisultato(search);
        else this.getMovies();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.tiolo {
  color: white;
  font-family: fantasy;
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

.tiolo {
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.overview {
  color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 17px;
}
.bottone {
  position: absolute;
  bottom: 10px;
  right: 10px;
  left: 10px;
  padding: 10px;
  font-family: monospace;
}

.altro {
  margin-bottom: 10px;
}
</style>
