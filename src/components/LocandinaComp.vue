<template>
  <img :src="`https://image.tmdb.org/t/p/original` + immagine" class="img" />
</template>
<script>
export default {
  name: "LocandinaComp",
  props: ["immagine"],
};
</script>

<style>
.img {
  width: 400px;
  height: 550px;
  border: 3px solid white;
  border-radius: 20px;
  margin-bottom: 10px;
}
</style>
