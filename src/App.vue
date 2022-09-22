<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <img
        src="./assets/jason-dent-SnXIF8_2oPw-unsplash.jpg"
        alt=""
        class="logo"
      />
      <h1 class="titoloLogo">Movie World</h1>
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
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

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
</style>
