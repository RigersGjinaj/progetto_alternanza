<template>
  <div>
    <h3 class="titolo" v-if="this.$root.selectedLanguage == 'it'">
      Qualcosa è andato storto torna alla home
    </h3>
    <h3 class="titolo" v-else>Something went wrong back to the home</h3>
    <router-link to="/"
      ><button type="button" class="btn btn-info">Home</button></router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}
#footer {
  visibility: hidden;
}
</style>
