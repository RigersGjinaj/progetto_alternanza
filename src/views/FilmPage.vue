<template>
  <div>
    <home-comp :vediDettagli="vediDettagli" :displays="movies"></home-comp>
    <pagination-component
      :next="mostraAltro"
      :previous="mostraMeno"
      :currentPage="movies.page"
      :totalPages="movies.total_pages"
    ></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import HomeComp from "@/components/HomeComp.vue";
let top = document.documentElement;

export default {
  mounted() {
    this.getMovies();
    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getMovies();
      },
      { immediate: true }
    );
  },
  components: { PaginationComponent, HomeComp },

  data() {
    return {
      movies: [],
      dettagli: false,
    };
  },

  methods: {
    async getMovies() {
      this.movies = await this.fetcher("movie/popular");
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

    vediDettagli(id) {
      this.$router.push({ name: "paginaFilm", params: { movie: id } });
    },
    async getRisultato(search) {
      this.movies = await this.fetcher("search/multi", { query: search });
    },

    mostraAltro() {
      this.movies.page++;
      this.getMovies();
      top.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    mostraMeno() {
      if (this.movies.page == 1) {
        return;
      }
      this.movies.page--;
      this.getMovies();
      top.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
.card {
  width: 200px;
  height: 300px;
}
.linea {
  color: black;
  height: 4px;
}
.distanza {
  margin-top: 20px;
  margin-bottom: 20px;
}

.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}

.altro {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.pulsante {
  max-width: 300px;
}
</style>
