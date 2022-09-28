<template>
  <div>
    <titolo-comp :titolo="tv.name"></titolo-comp>
    <div class="parent flex-parent">
      <div class="child flex-child">
        <locandina-comp :immagine="tv.poster_path"></locandina-comp>
      </div>
      <div class="child flex-child riquadro">
        <descrizione-comp
          :trama="tv.overview"
          :dataDiRilascio="tv.first_air_date"
          :votoMedio="tv.vote_average"
          :contoVoti="tv.vote_count"
        ></descrizione-comp>
        <provider-comp
          :flatrate="flatrate"
          :buy="buy"
          :link="link"
        ></provider-comp>
      </div>
    </div>
    <recensioni-comp :reviews="reviews"></recensioni-comp>
    <simili-comp
      :redirect="vediDettagli"
      :recommendations="recommendations"
    ></simili-comp>
  </div>
</template>

<script>
import DescrizioneComp from "@/components/DescrizioneComp.vue";
import TitoloComp from "@/components/TitoloComp.vue";
import LocandinaComp from "@/components/LocandinaComp.vue";
import ProviderComp from "@/components/ProviderComp.vue";
import RecensioniComp from "@/components/RecensioniComp.vue";
import SimiliComp from "@/components/SimiliComp.vue";
export default {
  mounted() {
    this.getTv();
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
    SimiliComp,
  },
  data() {
    return {
      tv: {},
      recommendations: [],
      reviews: [],
      flatrate: {},
      buy: {},
      link: "",
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getTv();
        this.getRecommendations();
        this.getReviews();
        this.getProviders();
      },
      { immediate: true }
    );

    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getTv();
        this.getRecommendations();
        this.getReviews();
        this.getProviders();
      },
      { immediate: true }
    );
  },
  methods: {
    async getTv() {
      this.tv = await this.fetcher("tv/" + this.$route.params.tv);
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

    vediDettagli(id) {
      this.$router.push({ name: "paginaTv", params: { tv: id } });
    },

    async getRecommendations() {
      this.recommendations = await this.fetcher(
        "tv/" + this.$route.params.tv + "/similar"
      );
    },

    async getReviews() {
      this.reviews = await this.fetcher(
        "tv/" + this.$route.params.tv + "/reviews"
      );
    },
    async getProviders() {
      await this.fetcher(
        "tv/" + this.$route.params.tv + "/watch/providers"
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
.overview {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
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

.recensione {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 12px;
  text-align: left;
}
</style>
