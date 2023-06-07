<template>
  <div>
    <div class="text-h5 q-ma-xl">Category : {{ category }}</div>
    <div v-if="moviesLoaded" class="q-mx-lg">
      <movie-list
        :movies="movies"
        :category="category ? category : 'Action'"
        :no-actions="true"
      />
    </div>

    <div v-else>
      Acum se incarca filmele

      <q-spinner />
    </div>
  </div>
</template>

<script setup>
import MovieList from "../components/MovieList.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMoviesStore } from "../stores";

const moviesStore = useMoviesStore();
const { movies, moviesLoaded } = storeToRefs(moviesStore);

const route = useRoute();
const category = route.params.genre;

moviesStore.loadMovies();
</script>
