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
      <div class="flex flex-col mt-12 text-center">
        <h1 class="text-6xl" style="color: #1ed760">Spotify Player</h1>
      </div>
      <div class="flex justify-evenly flex-wrap">
        <CurrentlyPlaying :player="player" />
        <Playlists :playlist="playlists" />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

import Nav from '../components/Nav'
import CurrentlyPlaying from '../components/CurrentlyPlaying'
import Playlists from '../components/Playlists'
export default {
  components: {
    Nav,
    CurrentlyPlaying,
    Playlists,
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
    await axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        this.player = resp.data
      })
    await axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        this.playlists = resp.data.items
      })
  },
  data() {
    return {
      player: null,
      playlists: null,
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
}
</script>
