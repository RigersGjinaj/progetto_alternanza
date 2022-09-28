<template>
  <nav class="navbar navbar-expand-lg stile">
    <div class="container-fluid">
      <router-link to="/">
        <h1 class="titoloLogo mouse">Movie World</h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              v-if="selectedLanguage == 'it'"
              to="/film"
              class="film-serie mouse"
              >Film</router-link
            >
            <router-link v-else to="/film" class="film-serie mouse"
              >Movies</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="selectedLanguage == 'it'"
              to="/serietv"
              class="film-serie mouse"
              >Serie TV</router-link
            >
            <router-link v-else to="/serietv" class="film-serie mouse"
              >TV series</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <select
              class="btn btn-outline-info selezione"
              aria-label="Default select example"
              v-model="selectedLanguage"
              @change="translate(this.value)"
            >
              <option v-if="selectedLanguage == 'it'" value="it">
                Italiano
              </option>
              <option v-else value="it">Italian</option>
              <option v-if="selectedLanguage == 'it'" value="en">
                Inglese
              </option>
              <option v-else value="en">English</option>
            </select>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="ricerca">
          <input
            v-if="selectedLanguage == 'it'"
            class="form-control me-2"
            type="search"
            placeholder="Cerca"
            aria-label="Cerca"
            v-model="search"
          />
          <input
            v-else
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="search"
          />
          <button
            v-if="selectedLanguage == 'it'"
            class="btn btn-outline-info"
            type="submit"
          >
            Cerca
          </button>
          <button v-else class="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
  <hr class="linea" />
  <router-view />
  <div class="alert alert-dark fondo" role="alert">
    <div class="contenuto">
      <router-link to="/" class="textFondo sopra">Home</router-link>
      <router-link
        v-if="this.selectedLanguage == 'it'"
        to="/film"
        class="textFondo sopra"
        >Film</router-link
      >
      <router-link v-else to="/film" class="textFondo sopra"
        >Movies</router-link
      >
      <router-link
        v-if="this.selectedLanguage == 'it'"
        to="/serietv"
        class="textFondo sopra"
        >Serie TV</router-link
      >
      <router-link v-else to="/film" class="textFondo sopra"
        >TV series</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      search: null,
      selectedLanguage: "it",
    };
  },
  methods: {
    ricerca() {
      this.$router.replace({
        path: this.$route.path,
        query: { search: this.search },
      });
      this.search = null;
    },

    translate() {
      console.log(this.selectedLanguage);
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}

.home {
  color: whitesmoke;
  font-family: fantasy;
}
.stile {
  background-color: #36454f;
}
.textFondo {
  color: black;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-decoration: none;
}
.fondo {
  background-color: #7393b3;
  margin-top: 20px;
  min-height: 200px;
  margin-bottom: 0px;
  border: none;
  border-radius: 0px;
}
.sopra:hover {
  color: #36454f;
}
.linea {
  color: black;
  height: 4px;
}
.none {
  display: none;
}
.film-serie {
  color: whitesmoke;
  font-size: 25px;
  margin-left: 10px;
  font-family: fantasy;
  text-decoration: none;
}

.titoloLogo {
  font-family: fantasy;
  color: white;
  font-size: 35px;
  text-decoration: none;
}

.selezione {
  margin-left: 10px;
}
.mouse:hover {
  color: #7393b3;
}
</style>
