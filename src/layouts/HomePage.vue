<template>
  <div>
    <q-toolbar class="bg-brown-3 text-grey-10 shadow-2">
      <router-link to="/" class="text-h5 text-grey-10">BestMovies</router-link>
      <q-space />
      <q-tabs shrink>
        <q-route-tab to="/" label="Home" />
        <q-route-tab
          class="text-weight-bolder"
          to="/watch-list"
          label="Library"
        />
        <q-route-tab to="/Playlists" label="PlayLists" />
      </q-tabs>
    </q-toolbar>
  </div>

  <router-view />
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
