<template>
  <titolo-comp :titolo="movie.title"></titolo-comp>
  <div class="parent flex-parent">
    <div class="child flex-child">
      <locandina-comp :immagine="movie.poster_path"></locandina-comp>
    </div>
    <div class="child flex-child riquadro">
      <descrizione-comp
        :trama="movie.overview"
        :dataDiRilascio="movie.release_date"
        :votoMedio="movie.vote_average"
        :contoVoti="movie.vote_count"
      ></descrizione-comp>
      <provider-comp
        :flatrate="flatrate"
        :buy="buy"
        :link="link"
      ></provider-comp>
    </div>
  </div>
  <recensioni-comp :reviews="reviews"></recensioni-comp>
  <h3 v-if="this.$root.selectedLanguage == 'it'" class="titolo">Film simili</h3>
  <h3 v-else class="titolo">Similar movies</h3>
  <h3
    v-if="
      recommendations.results.length == 0 && this.$root.selectedLanguage == 'it'
    "
    class="titolo"
  >
    Film simili non presenti
  </h3>
  <h3
    v-else-if="
      recommendations.results.length == 0 && this.$root.selectedLanguage == 'en'
    "
    class="titolo"
  >
    Similar films not present
  </h3>
  <div v-else class="container text-center">
    <div class="row">
      <div
        class="col"
        v-for="recommendation in recommendations.results"
        :key="recommendation.id"
      >
        <div class="distanza card text-bg-dark">
          <img
            :src="
              `https://image.tmdb.org/t/p/original` + recommendation.poster_path
            "
            :alt="recommendation.title"
            class="card grandezza"
            @click="vediDettagli(recommendation.id)"
          />
          <div v-show="dettagli" class="card-img-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DescrizioneComp from "@/components/DescrizioneComp.vue";
import TitoloComp from "@/components/TitoloComp.vue";
import LocandinaComp from "@/components/LocandinaComp.vue";
import ProviderComp from "@/components/ProviderComp.vue";
import RecensioniComp from "@/components/RecensioniComp.vue";
export default {
  mounted() {
    this.getMovie();
    this.getRecommendations();
    this.getReviews();
    this.getProviders();
  },

  components: {
    DescrizioneComp,
    TitoloComp,
    LocandinaComp,
    ProviderComp,
    RecensioniComp,
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getMovie();
        this.getRecommendations();
        this.getReviews();
        this.getProviders();
      },
      { immediate: true }
    );
    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getMovie();
        this.getRecommendations();
        this.getReviews();
        this.getProviders();
      },
      { immediate: true }
    );
  },
  data() {
    return {
      movie: {},
      recommendations: [],
      reviews: [],
      flatrate: {},
      buy: {},
      link: "",
      traslations: [],
    };
  },
  methods: {
    async getMovie() {
      this.movie = await this.fetcher("movie/" + this.$route.params.movie);
    },
    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = this.$root.selectedLanguage || "it";
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

    async getRecommendations() {
      this.recommendations = await this.fetcher(
        "movie/" + this.$route.params.movie + "/recommendations"
      );
    },

    vediDettagli(id) {
      this.$router.push({ name: "paginaFilm", params: { movie: id } });
    },

    async getReviews() {
      this.reviews = await this.fetcher(
        "movie/" + this.$route.params.movie + "/reviews"
      );
    },
    async getProviders() {
      await this.fetcher(
        "movie/" + this.$route.params.movie + "/watch/providers"
      ).then((res) => {
        console.log(res);
        this.flatrate = res.results?.IT
          ? res.results?.IT.flatrate
          : res.results?.US.flatrate;
        this.buy = res.results?.IT ? res.results?.IT.buy : res.results?.US.buy;
        this.link = res.results?.IT
          ? res.results?.IT.link
          : res.results?.US.link;
      });
    },
    getUrl(path) {
      return path != undefined
        ? `https://image.tmdb.org/t/p/original${path}`
        : `https://www.google.com/search?q=img+100x100&rlz=1C1ONGR_itIT1023IT1023&sxsrf=ALiCzsYsmGF83Wom32UvtR0BCO5Eye9idw:1664196645966&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjc7azPv7L6AhWKRvEDHYqLAlAQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=L9VFGqEeTKmGeM`;
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
.provider {
  height: 50px;
  width: 60px;
}
.sito {
  height: 50px;
  width: 50px;
  border-radius: 15px;
}
.recensioni {
  border: 3px solid white;
  border-radius: 10px;
  height: auto;
  width: 900px;
  margin-left: 18%;
  margin-top: 10px;
}

.autore {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  text-align: left;
}
.overview {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
}
.recensione {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 12px;
  text-align: left;
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
  height: auto;
  border: 3px solid white;
  border-radius: 10px;
  margin-top: 16px;
}
.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}

.card {
  width: 200px;
  height: 300px;
}
</style>
