<template>
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button
      v-if="$root.selectedLanguage == 'it'"
      type="button"
      class="btn btn-outline-info pulsante"
      @click="callPrevious"
    >
      Indietro
    </button>
    <button
      v-else
      type="button"
      class="btn btn-outline-info pulsante"
      @click="callPrevious"
    >
      Less
    </button>
    <button
      v-if="$root.selectedLanguage == 'it'"
      type="button"
      class="btn btn-info"
    >
      {{ currentPage }} di {{ totalPages }}
    </button>
    <button v-else type="button" class="btn btn-info">
      {{ currentPage }} of {{ totalPages }}
    </button>
    <button
      v-if="$root.selectedLanguage == 'it'"
      type="button"
      class="btn btn-outline-info pulsante"
      @click="callNext"
    >
      Avanti
    </button>
    <button
      v-else
      type="button"
      class="btn btn-outline-info pulsante"
      @click="callNext"
    >
      More
    </button>
  </div>
</template>

<script>
export default {
  props: ["next", "previous", "currentPage", "totalPages"],

  methods: {
    callNext() {
      this.next();
    },
    callPrevious() {
      this.previous();
    },
  },
};
</script>

<style></style>
