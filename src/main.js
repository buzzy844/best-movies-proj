import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
// animations
import "@quasar/extras/animate/fadeInDown.css";
import "@quasar/extras/animate/fadeOutUp.css";
import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";

import App from "./App.vue";
import CategoriesPage from "./pages/CategoriesPage.vue";
import HomePage from "./layouts/HomePage.vue";
import Library from "./pages/Library.vue";
import MoviePage from "./pages/MoviePage.vue";
import Playlists from "./pages/Playlists.vue"
import { Quasar } from "quasar";
import SelectedCatPage from "./pages/SelectedCatPage.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

const routes = [
  {
    component: HomePage,
    path: "",
    children: [
      { path: "", component: CategoriesPage },
      {
        path: "watch-list",
        component: Library,
      },
      {
        path: "movie/:movieId",
        component: MoviePage,
      },

      { path: "playlists", component: Playlists },
      { path: "category/:genre", component: SelectedCatPage },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {},
});

myApp.use(createPinia());

myApp.use(router);

myApp.mount("#app");
