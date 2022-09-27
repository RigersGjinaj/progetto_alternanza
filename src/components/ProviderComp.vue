<template>
  <h6 v-if="flatrate != undefined" class="titolo">Streaming:</h6>
  <div class="container text-center">
    <div class="row">
      <div class="col provider" v-for="flatrate in flatrate" :key="flatrate.id">
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
  <h6
    v-if="buy != undefined && this.$root.selectedLanguage == 'it'"
    class="titolo"
  >
    Compra:
  </h6>
  <h6
    v-else-if="buy != undefined && this.$root.selectedLanguage == 'en'"
    class="titolo"
  >
    Buy:
  </h6>
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
</template>

<script>
export default {
  name: "ProviderComp",
  props: ["flatrate", "buy", "link"],

  methods: {
    getUrl(path) {
      return path != undefined
        ? `https://image.tmdb.org/t/p/original${path}`
        : `https://www.google.com/search?q=img+100x100&rlz=1C1ONGR_itIT1023IT1023&sxsrf=ALiCzsYsmGF83Wom32UvtR0BCO5Eye9idw:1664196645966&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjc7azPv7L6AhWKRvEDHYqLAlAQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=L9VFGqEeTKmGeM`;
    },
  },
};
</script>

<style></style>
