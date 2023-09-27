import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { defineStore, storeToRefs } from "pinia";

import { db } from "./firebase/init";
import { ref } from "vue";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref([]);
  const moviesLoaded = ref(false);

  async function loadMovies() {
    if (moviesLoaded.value) {
      return;
    }

    moviesLoaded.value = false;

    const querySnapshot = await getDocs(collection(db, "movies"));

    querySnapshot.forEach((doc) => {
      movies.value.push({ ...doc.data(), id: doc.id });
    });

    moviesLoaded.value = true;
  }

  async function postMovie(data) {
    data.watched = false;

    const docRef = await addDoc(collection(db, "movies"), data);

    data.id = docRef.id;

    movies.value.push(data);
  }

  async function changeWatchStatus(idx, id) {
    try {
      const movie = movies.value.find((m) => m.id === id);

      if (!movie) {
        return;
      }

      movie.watched = true;
      const movieRef = doc(db, "movies", id);
      console.log("pula");
      await updateDoc(movieRef, { watched: true });
    } catch (error) {
      console.log("error changing watch status");
    }
  }

  async function deleteMovie(id) {
    movies.value = movies.value.filter((movie) => movie.id != id);
    const playListStore = usePlaylistStore();
    const { playlists } = storeToRefs(playListStore);

    const filteredPlaylists = playlists.value.filter((el) => {
      if (el.movies.includes(id) || el.series.includes(id)) {
        return true;
      }

      return false;
    });

    if (filteredPlaylists.length) {
      for (const playlist of filteredPlaylists) {
        const docRef = doc(db, "playlists", playlist.id);

        await updateDoc(docRef, {
          movies: arrayRemove(id),
          series: arrayRemove(id),
        });
      }
    }

    try {
      await deleteDoc(doc(db, "movies", id));
    } catch (error) {
      console.log("error deleting element");
    }
  }

  return {
    movies,
    moviesLoaded,
    loadMovies,
    postMovie,
    changeWatchStatus,
    deleteMovie,
  };
});

export const usePlaylistStore = defineStore("playlists", () => {
  const playlists = ref([]);
  const playlistsLoaded = ref(false);

  async function loadPlaylists() {
    if (playlistsLoaded.value) {
      return;
    }

    playlistsLoaded.value = false;
    playlists.value = [];

    const docSnapshot = await getDocs(collection(db, "playlists"));

    docSnapshot.forEach((doc) => {
      playlists.value.push({ ...doc.data(), id: doc.id });
    });

    playlistsLoaded.value = true;
  }

  async function postPlaylist(data) {
    const copy = { ...data };
    copy.created = new Date().toLocaleDateString();
    copy.movies = [];
    copy.series = [];

    const docRef = await addDoc(collection(db, "playlists"), { ...copy });

    copy.id = docRef.id;
    playlists.value.push(copy);
  }

  async function addToPlaylist(movieId, playlistId, movieType) {
    const docRef = doc(db, "playlists", playlistId);
    playlistsLoaded.value = false;

    if (movieType === "movie") {
      await updateDoc(docRef, {
        movies: arrayUnion(movieId),
      });
    } else {
      await updateDoc(docRef, {
        series: arrayUnion(movieId),
      });
    }

    loadPlaylists();
  }

  async function getPlaylistMovies(movies, series) {
    const playlistMovies = [];

    for (const m of movies) {
      const docRef = doc(db, "movies", m);

      const docSnap = await getDoc(docRef);

      const data = { ...docSnap.data(), id: docSnap.id };
      playlistMovies.push(data);
    }

    for (const s of series) {
      const docRef = doc(db, "movies", s);

      const docSnap = await getDoc(docRef);
      const data = { ...docSnap.data(), id: docSnap.id };

      playlistMovies.push(data);
    }

    return playlistMovies;
  }

  return {
    addToPlaylist,
    playlists,
    loadPlaylists,
    postPlaylist,
    getPlaylistMovies,
  };
});
