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
      </div>
    </div>
  </div>
  <div class="btn-group altro" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-primary" @click="mostraAltro">
      Mostra altre Serie Tv
    </button>
    <button type="button" class="btn btn-primary" @click="mostraMeno">
      Mostra meno Serie Tv
    </button>
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
    },
    mostraMeno() {
      if (this.tvs.page == 1) {
        return;
      }
      this.tvs.page--;
      this.tvs.push(this.getTv());
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
