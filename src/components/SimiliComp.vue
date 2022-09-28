<template>
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
            @click="redirect(recommendation.id)"
          />
          <div v-show="dettagli" class="card-img-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimiliComp",
  props: ["redirect", "recommendations"],
};
</script>

<style></style>
