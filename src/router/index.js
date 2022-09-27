import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/film",
    name: "film",
    component: () => import("@/views/FilmPage.vue"),
  },

  {
    path: "/serietv",
    name: "serietv",
    component: () => import("@/views/TvPage.vue"),
  },
  {
    path: "/paginaDettagliFilm/:movie",
    name: "paginaFilm",
    component: () => import("@/components/PaginaDettagliFilm.vue"),
  },
  {
    path: "/paginaDettagliTv/:tv",
    name: "paginaTv",
    component: () => import("@/components/PaginaDettagliTv.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0, behavior: "smooth" }));
    });
  },
});

export default router;
