<template>
  <div class="container text-center">
    <div class="row">
      <div class="col" v-for="tv in tvs.results" :key="tv.id">
        <div class="distanza card text-bg-dark">
          <img
            :src="`https://image.tmdb.org/t/p/original` + tv.poster_path"
            :alt="tv.title"
            class="card grandezza"
            @click="vediDettagli(tv.id)"
          />
          <div>
            <div v-show="dettagli" class="card-img-overlay"></div>
          </div>
        </div>
        <hr class="linea" />
      </div>
    </div>
  </div>
  <div class="btn-group altro" role="group" aria-label="Basic example">
    <button
      v-if="this.$root.selectedLanguage == 'it'"
      type="button"
      class="btn btn-primary"
      @click="mostraAltro"
    >
      Mostra di piu'
    </button>
    <button
      v-if="this.$root.selectedLanguage == 'it'"
      type="button"
      class="btn btn-primary"
      @click="mostraMeno"
    >
      Mostra meno
    </button>
    <button
      v-if="this.$root.selectedLanguage == 'en'"
      type="button"
      class="btn btn-primary"
      @click="mostraAltro"
    >
      Show more
    </button>
    <button
      v-if="this.$root.selectedLanguage == 'en'"
      type="button"
      class="btn btn-primary"
      @click="mostraMeno"
    >
      Show less
    </button>
  </div>
</template>

<script>
var rootElement = document.documentElement;
export default {
  mounted() {
    this.getTv();
    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getTv();
      },
      { immediate: true }
    );
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
    },

    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = this.$root.selectedLanguage || "it";
      options.page = this.tvs.page;
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
      this.$router.push({ name: "paginaTv", params: { tv: id } });
    },

    async getRisultato(search) {
      this.tvs = await this.fetcher("search/multi", { query: search });
    },

    mostraAltro() {
      this.tvs.page++;
      this.tvs.push(this.getTv());
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    mostraMeno() {
      if (this.tvs.page == 1) {
        return;
      }
      this.tvs.page--;
      this.tvs.push(this.getTv());
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },

  watch: {
    "$route.query.search": {
      handler: function (search) {
        console.log(search);
        if (search) this.getRisultato(search);
        else this.getTv();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}

.card {
  width: 200px;
  height: 300px;
}

.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}
.linea {
  color: black;
  height: 4px;
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
.altro {
  margin-bottom: 10px;
}
</style>
