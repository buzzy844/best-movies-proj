<template>
  <div class="q-ma-lg">
    <h3>Playlists:</h3>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-expansion-item
          v-for="playlist in playlists"
          group="somegroup"
          :key="playlist.id"
          :label="playlist.name"
          header-class="text-primary text-grey-10 bg-brown-4 "
          hide-expand-icon
          expand-separator
          @click="loadPlaylistMovies(playlist.movies, playlist.series)"
        >
          <q-card class="bg-grey-4">
            <q-card-section>
              <movie-list
                v-if="moviesLoaded"
                :movies="playlistMovies"
                :actions="true"
              />
              <loading v-else />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import MovieList from "../components/MovieList.vue";
import Loading from "../components/Loading.vue";
import { storeToRefs } from "pinia";
import { usePlaylistStore } from "../stores";

import { ref } from "vue";

const playlistStore = usePlaylistStore();

const { loadPlaylists, getPlaylistMovies } = playlistStore;
const { playlists } = storeToRefs(playlistStore);
const playlistMovies = ref([]);
const moviesLoaded = ref(false);

console.log(playlistMovies.value);

async function loadPlaylistMovies(movies, series) {
  moviesLoaded.value = false;

  playlistMovies.value = await getPlaylistMovies(movies, series);

  moviesLoaded.value = true;
}

console.log(playlists.value);

loadPlaylists();
</script>
