<template>
  <h3 v-if="this.$root.selectedLanguage == 'it'" class="titolo">Recensioni</h3>
  <h3 v-else class="titolo">Reviews:</h3>
  <h4
    v-if="reviews.results.length == 0 && this.$root.selectedLanguage == 'it'"
    class="titolo"
  >
    Non ci sono recensioni
  </h4>
  <h4
    v-else-if="
      reviews.results.length == 0 && this.$root.selectedLanguage == 'en'
    "
    class="titolo"
  >
    There are no reviews
  </h4>
  <div
    v-for="review in reviews.results"
    :key="review.id"
    v-else
    class="recensioni"
  >
    <h5 v-if="this.$root.selectedLanguage == 'it'" class="autore">
      Autore: {{ review.author }}
    </h5>
    <h5 v-else class="autore">Author: {{ review.author }}</h5>
    <p class="recensione">{{ review.content }}</p>
    <p
      v-if="
        review.author_details.rating != null &&
        this.$root.selectedLanguage == 'it'
      "
      class="recensione"
    >
      Voto: {{ review.author_details.rating }}
    </p>
  </div>
</template>

<script>
export default {
  name: "RecensioniComp",
  props: ["reviews"],
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
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
