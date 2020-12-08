<template>
  <div class="flex text-white min-h-screen bg-bg">
    <Nav />
    <main class="flex flex-col items-center justify-around w-screen">
      <div class="flex justify-center flex-col mt-12 text-center">
        <h1 class="text-6xl text-spotify">Spotify Player</h1>
      </div>
      <Search />
      <Results v-if="searchedTracks" />
      <div
        class="flex justify-center mb-24 flex-wrap"
        style="max-width: 1300px"
      >
        <CurrentlyPlaying
          v-if="player && player.item && player.device"
          :player="player"
        />
        <Playlists v-if="playlists" :playlists="playlists.items" />
      </div>
      <PlayerController
        v-if="player && this.$auth.user.product === 'premium'"
        :player="player"
      />
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
  },
  computed: {
    ...mapGetters(['player', 'searchedTracks', 'playlists']),
  },
  mounted() {
    this.refresh()
  },
  created() {
    this.$store.dispatch('loadPlayer')
    this.$store.dispatch('loadPlaylists')
    if (!this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    refresh() {
      setInterval(() => {
        this.$store.dispatch('loadPlayer')
        this.$store.dispatch('loadPlaylists')
      }, 3000)
    },
  },
}
</script>
