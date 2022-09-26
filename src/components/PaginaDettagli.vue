<template>
  <h1 class="titolo">{{ movie.title }}</h1>
  <div class="parent flex-parent">
    <div class="child flex-child">
      <img
        :src="`https://image.tmdb.org/t/p/original` + movie.poster_path"
        :alt="movie.title"
        class="img"
      />
    </div>
    <div class="child flex-child riquadro">
      <h5 class="titolo">Trama:</h5>
      <p v-if="movie.overview == ''" class="overview">Trama non presente</p>
      <p v-else class="overview">{{ movie.overview }}</p>
      <h5 class="titolo">Data di rilascio:</h5>
      <p class="overview">{{ movie.release_date }}</p>
      <h5 class="titolo">Voto medio:</h5>
      <p class="overview">
        {{ movie.vote_average }} <br />
        voti totali: {{ movie.vote_count }}
      </p>
      <h6 v-if="flatrate != undefined" class="titolo">Streaming:</h6>
      <div class="container text-center">
        <div class="row">
          <div
            class="col provider"
            v-for="flatrate in flatrate"
            :key="flatrate.id"
          >
            <a :href="link" target="blank">
              <img
                :src="getUrl(flatrate.logo_path)"
                :alt="flatrate.provider_name"
                class="sito"
              />
            </a>
          </div>
        </div>
      </div>
      <h6 v-if="buy != undefined" class="titolo">Compra:</h6>
      <div class="container text-center">
        <div class="row">
          <div class="col provider" v-for="buy in buy" :key="buy.id">
            <a :href="link" target="blank"
              ><img
                :src="getUrl(buy.logo_path)"
                :alt="buy.provider_name"
                class="sito"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3 class="titolo">Recensioni</h3>
  <h4 v-if="reviews.results.length == 0" class="titolo">
    Non ci sono recensioni
  </h4>
  <div
    v-for="review in reviews.results"
    :key="review.id"
    v-else
    class="recensioni"
  >
    <h5 class="autore">Autore: {{ review.author }}</h5>
    <p class="recensione">{{ review.content }}</p>
    <p v-if="review.author_details.rating != null" class="recensione">
      Voto: {{ review.author_details.rating }}
    </p>
  </div>

  <h3 class="titolo">Film simili</h3>
  <h3 v-if="recommendations.results.length == 0" class="titolo">
    Film simili non presenti
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
export default {
  mounted() {
    console.log(this.providers);
    this.getMovie();
    this.getRecommendations();
    this.getReviews();
    this.getProviders();
    console.log(this.providers);
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
  },
  data() {
    return {
      movie: {},
      recommendations: [],
      reviews: [],
      flatrate: {},
      buy: {},
      link: "",
    };
  },
  methods: {
    async getMovie() {
      this.movie = await this.fetcher("movie/" + this.$route.params.movie);
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

    async getRecommendations() {
      this.recommendations = await this.fetcher(
        "movie/" + this.$route.params.movie + "/recommendations"
      );
    },

    vediDettagli(id) {
      this.$router.push({ name: "pagina", params: { movie: id } });
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
