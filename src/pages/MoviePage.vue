<template>
  <div class="q-ma-lg">
    <q-card>
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-lg-6">
          <q-img
            class="q-ma-md"
            style="max-height: 500px"
            :src="selectedMovie.Poster"
            :ratio="4 / 6"
          />
        </div>

        <div>{{ selectedMovie.Title }}</div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { useMoviesStore } from "../stores";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const moviesStore = useMoviesStore();
const { loadMovies } = moviesStore;
const { movies } = storeToRefs(moviesStore);

loadMovies();

const id = computed(() => route.params.movieId);
const selectedMovie = computed(() =>
  movies.value.find((el) => el.id === id.value)
);
</script>
