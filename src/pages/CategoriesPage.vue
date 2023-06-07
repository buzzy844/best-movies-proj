<template>
  <div class="q-mb-xl hide-scrollbar">
    <div class="text-h5 q-pa-md q-ma-lg text-grey-10">Categories:</div>
    <div class="q-pr-xl">
      <div class="row items-start justify-around q-col-gutter-xl q-mx-xl">
        <div
          v-for="category in Categories"
          class="col-xs-12 col-sm-6 col-md-4 col-xl-3"
          :key="category.genre"
        >
          <router-link :to="`category/${category.genre}`">
            <q-card class="grow cursor-pointer">
              <q-img :src="category.img" :ratio="4 / 6">
                <div class="absolute-bottom text-h6 text-center">
                  {{ category.genre }}
                </div>
              </q-img>
            </q-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMoviesStore } from "../stores";
const moviesStore = useMoviesStore();

const { loadMovies } = moviesStore;
loadMovies();

const Categories = ref([
  {
    genre: "Action",
    img: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_FMjpg_UX1000_.jpg",
  },
  {
    genre: "Adventure",
    img: "https://cdn.shopify.com/s/files/1/1057/4964/products/Indiana-Jones-and-the-Last-Crusade-Vintage-Movie-Poster-Original-1-Sheet-27x41_300x@2x.jpg?v=1629867656",
  },
  {
    genre: "Animation",
    img: "https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_.jpg",
  },
  {
    genre: "Comedy",
    img: "https://www.themoviedb.org/t/p/original/iW4v3OuewJmbpCvwUmyd1EIvpQp.jpg",
  },
  {
    genre: "Documentary",
    img: "https://whatsondisneyplus.com/wp-content/uploads/2022/10/FfZdUJNVQAAcn8L1-scaled.jpeg",
  },
  {
    genre: "Drama",
    img: "https://otopark.ro/uploads_1-19276/content_1917-full-movie-poster-canvas-printuri-de-arta-de-perete.jpg",
  },

  {
    genre: "Horror",
    img: "https://m.media-amazon.com/images/I/51PRZTprHEL._AC_UF894,1000_QL80_.jpg",
  },
  {
    genre: "Romance",
    img: "https://img.fruugo.com/product/6/31/14366316_max.jpg",
  },

  {
    genre: "Sci-fi",
    img: "https://m.media-amazon.com/images/I/91TYB8gep+L.jpg",
  },
  {
    genre: "Thriller",
    img: "https://m.media-amazon.com/images/M/MV5BMTQzNTcwODEyM15BMl5BanBnXkFtZTcwMjM1MDI0OQ@@._V1_.jpg",
  },
]);
</script>

<style scoped>
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px 0 rgba(156, 156, 156, 0.2),
    0 6px 20px 0 rgba(156, 156, 156, 0.2);
}
</style>
