<template>
  <div>
    <div class="q-ma-lg">
      <div class="justify-center row">
        <div
          class="col-xs-12 col-md-6 col-lg-8 bg-brown-7 rounded-borders q-pa-md"
        >
          <q-input
            class="full-width"
            :loading="loading"
            :debounce="500"
            dark
            color="grey-4"
            v-model="title"
            label="Movie Title"
          />
          <div
            style="transition: max-height 0.2s"
            :style="{
              maxHeight: foundMovies.length && title.length ? '700px' : '0px',
            }"
          >
            <transition
              :duration="250"
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOutUp"
            >
              <q-list
                v-if="foundMovies.length && title.length"
                dark
                separator
                class="fit q-mt-md bg-brown-7"
              >
                <q-item
                  class="q-px-none"
                  clickable
                  v-ripple
                  @click="fetchSelectedMovie(movie.imdbID)"
                  v-for="movie in foundMovies"
                >
                  <q-item-section>
                    <q-item-label>{{ movie.Title }}</q-item-label>
                    <q-item-label caption>Year: {{ movie.Year }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>Type: {{ movie.Type }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <movie-list v-if="moviesLoaded" :movies="movies" />

    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script setup>
import MovieList from "../components/MovieList.vue";
import Loading from "../components/Loading.vue";
import { useMoviesStore } from "../stores";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

const moviesStore = useMoviesStore();
const { movies, moviesLoaded } = storeToRefs(moviesStore);
const { loadMovies, postMovie } = moviesStore;
loadMovies();
const title = ref("");
const foundMovies = ref([]);
const loading = ref(false);

async function fetchMoviesOMDB(title) {
  if (title.length < 2) {
    return;
  }

  loading.value = true;
  const titleURI = encodeURI(title);
  console.log(`Searching... ${titleURI}`);
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=97690e43&s=${titleURI}`
  );
  const data = await res.json();
  loading.value = false;
  if (!data?.Search?.length) {
    return;
  }

  foundMovies.value = data.Search;
  console.log(foundMovies.value);
}

async function fetchSelectedMovie(id) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=97690e43&i=${id}&plot=full`
  );
  const data = await res.json();

  title.value = "";
  foundMovies.value = [];
  await postMovie({ ...data });
}

watch(title, (title) => {
  fetchMoviesOMDB(title);
});
</script>

<style scoped></style>
