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
      <p class="overview">{{ movie.overview }}</p>
      <h5 class="titolo">Data di rilascio:</h5>
      <p class="overview">{{ movie.release_date }}</p>
      <h5 class="titolo">Voto medio:</h5>
      <p class="overview">
        {{ movie.vote_average }} <br />
        voti totali: {{ movie.vote_count }}
      </p>
      <button type="button" class="btn btn-danger">Play</button>
    </div>
  </div>
  <h3 class="titolo">Recensioni</h3>
  <div v-for="review in reviews.results" :key="review.id">
    <h4 class="titolo">Autore: {{ review.author }}</h4>
    <p class="overview">{{ review.content }}</p>
  </div>
  <h3 class="titolo">Film simili</h3>
  <div class="container text-center">
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
    this.getMovie();
    this.getRecommendations();
    this.getReviews();
    console.log(this.recommendations);
  },
  data() {
    return {
      movie: {},
      recommendations: [],
      reviews: [],
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
.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}

.card {
  width: 200px;
  height: 300px;
}
</style>
