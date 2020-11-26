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
      <Search />
      <Results v-if="searchedTracks" />
      <div class="flex justify-between mb-24 flex-wrap" style="width: 1300px">
        <CurrentlyPlaying :player="player" />
        <Playlists :playlist="playlists" />
      </div>
      <PlayerController :player="player" />
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Nav from '../components/Drawer/Nav'
import CurrentlyPlaying from '../components/Player/CurrentlyPlaying'
import Playlists from '../components/Player/Playlists'
import PlayerController from '../components/Player/Player-Bottom-Panel/PlayerController'
import Search from '../components/Player/Search'
import Results from '../components/Player/Search/Results'
export default {
  middleware: ['auth'],
  components: {
    Nav,
    CurrentlyPlaying,
    Playlists,
    PlayerController,
    Search,
    Results,
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
      playlists: null,
    }
  },
  computed: {
    ...mapGetters(['player']),
    ...mapGetters(['searchedTracks']),
  },
  mounted() {
    this.refresh()
  },
  created() {
    this.$store.dispatch('loadPlayer')
    if (!this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    refresh() {
      setInterval(() => {
        this.$store.dispatch('loadPlayer')
      }, 1000)
    },
  },
}
</script>
