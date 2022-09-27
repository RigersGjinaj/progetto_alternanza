<template>
  <h1 v-if="this.$root.selectedLanguage == 'it'" class="titolo">
    Film e Serie Tv
  </h1>
  <h1 v-else class="titolo">Movies and TV series</h1>
  <film-page></film-page>
  <tv-page></tv-page>
</template>

<script>
import FilmPage from "@/views/FilmPage.vue";
import TvPage from "@/views/TvPage.vue";
export default {
  components: { FilmPage, TvPage },
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}
</style>
