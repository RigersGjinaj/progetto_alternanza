<template>
  <div class="container text-center">
    <div class="row">
      <div class="col" v-for="display in displays.results" :key="display.id">
        <div class="distanza card text-bg-dark">
          <img
            :src="`https://image.tmdb.org/t/p/original` + display.poster_path"
            :alt="display.title"
            class="card grandezza"
            @click="redirect(display.id)"
          />
          <div v-show="dettagli" class="card-img-overlay"></div>
        </div>
        <hr class="linea" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeComp",
  props: ["vediDettagli", "displays"],
  methods: {
    redirect(id) {
      this.vediDettagli(id);
    },
  },
};
</script>

<style></style>
