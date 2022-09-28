<template>
  <div>
    <home-comp :vediDettagli="vediDettagli" :displays="tvs"></home-comp>
    <pagination-component
      :next="mostraAltro"
      :previous="mostraMeno"
      :currentPage="tvs.page"
      :totalPages="tvs.total_pages"
    ></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import HomeComp from "@/components/HomeComp.vue";
export default {
  components: { PaginationComponent, HomeComp },
  mounted() {
    this.getTv();
    this.$watch(
      () => this.$root.selectedLanguage,
      () => {
        this.getTv();
      },
      { immediate: true }
    );
  },

  data() {
    return {
      tvs: [],
      dettagli: false,
    };
  },

  methods: {
    async getTv() {
      this.tvs = await this.fetcher("tv/popular");
    },

    async fetcher(url, options = {}) {
      const apiKey = "6f9286d54de4891ea7a5c91779e09786";
      options.api_key = apiKey;
      options.language = this.$root.selectedLanguage || "it";
      options.page = this.tvs.page;
      const queryParams = "?" + new URLSearchParams(options).toString();
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/" + url + queryParams
        );
        return await res.json();
      } catch (message) {
        return console.error(message);
      }
    },

    vediDettagli(id) {
      this.$router.push({ name: "paginaTv", params: { tv: id } });
    },

    async getRisultato(search) {
      this.tvs = await this.fetcher("search/multi", { query: search });
    },

    mostraAltro() {
      this.tvs.page++;
      this.getTv();
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    mostraMeno() {
      if (this.tvs.page == 1) {
        return;
      }
      this.tvs.page--;
      this.getTv();
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },

  watch: {
    "$route.query.search": {
      handler: function (search) {
        console.log(search);
        if (search) this.getRisultato(search);
        else this.getTv();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.card {
  width: 200px;
  height: 300px;
}

.grandezza:hover {
  border: solid 4px whitesmoke;
  opacity: 50%;
}
.linea {
  color: black;
  height: 4px;
}
.distanza {
  margin-top: 20px;
  margin-bottom: 20px;
}
.altro {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.pulsante {
  max-width: 300px;
}
</style>
