<template>
  <div class="flex text-white min-h-screen bg-bg">
    <Nav />
    <main
      v-if="playlist && playlists"
      class="flex flex-col items-center justify-start w-screen"
    >
      <div class="flex justify-center flex-col my-12 text-center text-spotify">
        <h1 class="text-6xl">
          {{ playlist.name }}
        </h1>
      </div>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden sm:rounded-lg overflow-y-auto scrollbar-track-gray"
              style="max-height: 65vh"
            >
              <Table :tracks="playlist.tracks.items" :playlists="playlists" />
            </div>
          </div>
        </div>
      </div>
    </main>
    <PlayerController :player="player" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '../../components/Drawer/Nav'
import Table from '../../components/Playlist/Table'
import PlayerController from '../../components/Player/Player-Bottom-Panel/PlayerController'
export default {
  middleware: ['auth'],
  components: {
    Nav,
    PlayerController,
    Table,
  },
  async asyncData({ store, route }) {
    await store.dispatch('loadPlayer')
    await store.dispatch('GetPlaylist', route.params.playlist)
    await store.dispatch('loadPlaylists')
  },
  computed: {
    ...mapGetters(['player', 'playlists', 'playlist']),
  },

  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      setInterval(() => {
        this.$store.dispatch('loadPlayer')
        this.$store.dispatch('loadPlaylists')
        this.$store.dispatch('GetPlaylist', this.$route.params.playlist)
      }, 1000)
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #3f3f3f;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #272727;
  border-radius: 100vh;
  border: 3px solid #3f3f3f;
}
</style>
