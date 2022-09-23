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
    path: "/paginaDettagli/:movie",
    name: "pagina",
    component: () => import("@/components/PaginaDettagli.vue"),
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
});

export default router;
