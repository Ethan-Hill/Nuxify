<template>
  <div class="flex text-white min-h-screen bg-bg">
    <Nav />
    <main class="flex flex-col items-center justify-start w-screen">
      <div class="flex justify-center flex-col my-12 text-center text-spotify">
        <h1 v-if="playlist" class="text-6xl">{{ playlist.name }}</h1>
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
              <Table :tracks="tracks" :playlists="playlists.items" />
            </div>
          </div>
        </div>
      </div>
    </main>
    <PlayerController :player="player" />
  </div>
</template>

<script>
import axios from 'axios'
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

  async fetch() {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get(
        `https://api.spotify.com/v1/playlists/${this.$route.params.playlist}`,
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((resp) => {
        this.playlist = resp.data
        this.tracks = resp.data.tracks.items
      })
  },
  data() {
    return {
      playlist: null,
      tracks: null,
    }
  },

  computed: {
    ...mapGetters(['player', 'playlists']),
  },
  created() {
    this.$store.dispatch('loadPlayer')
    this.$store.dispatch('loadPlaylists')
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      setInterval(() => {
        this.$store.dispatch('loadPlayer')
        this.$store.dispatch('loadPlaylists')
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
