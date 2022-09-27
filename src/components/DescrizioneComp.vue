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
</template>

<script>
export default {
  name: "DescrizioneComp",
  props: ["trama", "dataDiRilascio", "votoMedio", "contoVoti"],
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
</style>
