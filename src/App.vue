<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/">
        <img
          src="./assets/jason-dent-SnXIF8_2oPw-unsplash.jpg"
          alt=""
          class="logo"
        />
      </router-link>
      <router-link to="/">
        <h1 class="titoloLogo mouse">Movie World</h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/film" class="film-serie">Film</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/serietv" class="film-serie">Serie Tv</router-link>
          </li>
          <select
            class="btn btn-primary selezione"
            aria-label="Default select example"
          >
            <option value="1">Italiano</option>
            <option value="2">Inglese</option>
          </select>
          <li>
            <form class="d-flex" role="search" @submit.prevent="ricerca">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Cerca"
                aria-label="Cerca"
                v-model="search"
              />
              <button class="btn btn-outline-light" type="submit">Cerca</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      search: null,
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

.film-serie {
  color: whitesmoke;
  font-size: 25px;
  font-family: fantasy;
}

.logo {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.titoloLogo {
  font-family: fantasy;
  color: white;
}

.selezione {
  width: 300px;
  margin-bottom: 5px;
  margin-left: 39%;
  position: relative;
}
.mouse:hover {
  color: blue;
}
</style>
