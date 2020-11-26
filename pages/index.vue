<template>
  <div
    class="flex text-white min-h-screen"
    style="background-color: #121212 !important"
  >
    <Nav />
    <main
      class="flex flex-col items-center justify-around w-screen"
      style="background-color: #121212 !important; background-size: auto"
    >
      <div class="flex flex-col text-center">
        <h1 class="text-5xl">Welcome to Nuxify</h1>
        <h2 class="text-4xl" style="color: #1ed760">All in one Spotify</h2>
        <h1 class="text-lg">Currently a work in progress</h1>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '../components/Drawer/Nav'

export default {
  components: {
    Nav,
  },
  async fetch() {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        this.$auth.setUser(resp.data)
      })
  },
  created() {
    this.$store.dispatch('loadPlaylists')
  },
}
</script>
