<template>
  <div class="row flex-center q-mx-lg">
    <q-dialog v-model="dialog">
      <div class="text-white bg-grey-10 flex-center">
        <q-card flat class="text-white bg-grey-10 flex-center q-ma-xl">
          <div>
            <div class="row q-mb-lg">
              <div class="row col-12 q-mb-md">
                <div class="text-h4 text-left">Playlists:</div>

                <q-space></q-space>
                <q-btn
                  flat
                  icon="library_add"
                  size="md"
                  @click="
                    () => {
                      addPlaylistVisible = !addPlaylistVisible;
                      playlist.name = '';
                    }
                  "
                />
              </div>

              <div
                v-if="addPlaylistVisible"
                class="col-12 row col-gutter-md justify-around"
              >
                <q-input
                  dark
                  label="name"
                  class="col-9"
                  v-model="playlist.name"
                />
                <q-btn
                  label="submit"
                  class="col-2"
                  @click="
                    () => {
                      postPlaylist(playlist);
                      addPlaylistVisible = false;
                    }
                  "
                />
              </div>
            </div>

            <q-list dark separator>
              <q-item
                v-for="[index, plist] in playlists.entries()"
                :key="plist.id"
                clickable
                @click="
                  () => {
                    dialog = false;
                    addToPlaylist(selectedMovieId, plist.id, selectedMovieType);
                  }
                "
              >
                <div class="q-mr-xl">{{ plist.name }}</div>
                <q-space />

                <q-item-section side>
                  <q-item-label>
                    <div>Date: {{ plist.created }}</div>
                  </q-item-label>
                  <q-item-label>
                    <div>Movies: {{ plist.movies.length }}</div>
                  </q-item-label>
                  <q-item-label>
                    <div>TV series: {{ plist.series.length }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card>
      </div>
    </q-dialog>
    <div class="q-ma-lg col-xs-12 col-lg-8">
      <div class="row items-start q-col-gutter-md">
        <div
          :key="movie.id"
          v-for="[index, movie] of filteredMovies.entries()"
          class="col-xs-6 col-sm-4 col-md-3 col-xl-3"
        >
          <q-card bordered>
            <q-img :src="movie.Poster" :ratio="10 / 16">
              <template v-slot:loading>
                <q-spinner-gears color="black" />
              </template>
              <q-badge floating right color="grey-10" class="q-ma-sm">
                <div class="row items-center">
                  <div class="self-end q-pt-xs" style="font-size: 14px">
                    {{ movie.imdbRating }}
                  </div>
                  <q-icon
                    name="star"
                    class="q-ml-xs"
                    color="yellow-12"
                    size="14px"
                  />
                </div>
              </q-badge>
              <q-badge
                color="grey-10"
                class="cursor-pointer"
                @click="
                  () => {
                    dialog = true;
                    selectedMovieId = movie.id;
                    selectedMovieType = movie.Type;
                  }
                "
              >
                <q-icon name="add" size="sm"></q-icon>
              </q-badge>
            </q-img>

            <q-card-section>
              <div
                class="text-h6 ellipsis cursor-pointer"
                @click.stop="router.push('/movie/' + movie.id)"
              >
                {{ movie.Title }}
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  {{ movie.Title }}
                </q-tooltip>
              </div>
              <div class="text-subtitle2">{{ movie.Year }}</div>
            </q-card-section>
            <q-card-actions
              v-if="props.actions"
              class="row q-col-gutter-sm q-pt-xs no-wrap justify-center q-mx-xs"
            >
              <q-btn
                class="col-xs-10"
                @click="changeWatchStatus(index, movie.id)"
                outline
                >{{ `${movie.watched ? "watched" : "not watched"}` }}</q-btn
              >
              <q-btn
                class="col-xs-2"
                flat
                icon="delete"
                @click="deleteMovie(movie.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMoviesStore } from "../stores";
import { usePlaylistStore } from "../stores";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const addPlaylistVisible = ref(false);
const moviesStore = useMoviesStore();
const playlistStore = usePlaylistStore();
const { changeWatchStatus, deleteMovie } = moviesStore;
const { postPlaylist, loadPlaylists, addToPlaylist } = playlistStore;

loadPlaylists();

const selectedMovieId = ref("");
const selectedMovieType = ref("");
const playlist = ref({ name: "", created: "", movies: [], series: [] });

const filteredMovies = computed(() =>
  props.category
    ? props.movies.filter((movie) => movie.Genre.includes(props.category))
    : props.movies
);

const router = useRouter();
const dialog = ref(false);
const { playlists } = storeToRefs(playlistStore);

const props = defineProps(["movies", "category", "actions"]);
</script>
