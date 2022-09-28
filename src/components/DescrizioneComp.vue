<template>
  <h5 v-if="this.$root.selectedLanguage == 'it'" class="titolo">Trama:</h5>
  <h5 v-else class="titolo">Overview</h5>
  <p class="overview">{{ trama }}</p>
  <h5 v-if="this.$root.selectedLanguage == 'it'" class="titolo">
    Data di rilascio:
  </h5>
  <h5 v-else class="titolo">Release date:</h5>
  <p class="overview">{{ dataDiRilascio }}</p>
  <h5 v-if="this.$root.selectedLanguage == 'it'" class="titolo">Voto medio:</h5>
  <h5 v-else class="titolo">Average rating:</h5>
  <p v-if="this.$root.selectedLanguage == 'it'" class="overview">
    {{ votoMedio }} <br />
    voti totali: {{ contoVoti }}
  </p>
  <p v-else class="overview">
    {{ votoMedio }} <br />
    vote count: {{ contoVoti }}
  </p>
  <div class="stars">
    <star-rating
      :increment="0.5"
      :max-rating="10"
      :clearable="true"
      :star-size="35"
      :show-rating="false"
      :animate="true"
      :rounded-corners="true"
      @click="vota"
      @update:rating="setRating"
    ></star-rating>
  </div>
  <div class="overview">
    {{ currentRatingText }}
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components: { StarRating },
  name: "DescrizioneComp",
  props: [
    "trama",
    "dataDiRilascio",
    "votoMedio",
    "contoVoti",
    "entra",
    "session",
    "vota",
  ],
  methods: {
    setRating(rating) {
      this.rating = rating;
    },
    votazione() {
      this.vota(this.rating);
    },
  },
  computed: {
    currentRatingText() {
      if (this.$root.selectedLanguage == "it") {
        return this.rating
          ? "Hai votato " + this.rating + " stelle su 10"
          : "Nessun voto";
      }
      return this.rating
        ? "You have rated " + this.rating + " stars out of 10"
        : "No vote";
    },
  },
  data() {
    return {
      rating: null,
      resetableRating: 2,
      currentRating: "No Rating",
      mouseOverRating: null,
    };
  },
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}
.overview {
  color: whitesmoke;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
}
.stars {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 5px;
}
</style>
