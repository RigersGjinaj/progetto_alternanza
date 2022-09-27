<template>
  <h1 class="titolo">{{ titolo }}</h1>
</template>
<script>
export default {
  name: "TitoloComp",
  props: ["titolo"],
};
</script>

<style>
.titolo {
  color: whitesmoke;
  font-family: fantasy;
}
</style>
