<template>
  <div class="mx-6">
    <h1 class="flex-wrap mx-6 mb-5 text-2xl">Tracks</h1>
    <div
      v-if="tracks"
      class="flex flex-wrap justify-around mb-24 overflow-y-auto"
      style="max-width: 1300px; height: 400px; background-color: #181818"
    >
      <div
        v-for="searchedTrack in searchedTracks"
        :key="searchedTrack.id"
        class="flex flex-col items-center justify-around w-full h-full py-5 mx-5 my-5 text-center transition duration-100 ease-in-out rounded cursor-pointer"
        onMouseOver="this.style.background='#282828'"
        onMouseOut="this.style.background='#181818'"
      >
        <div v-if="searchedTrack.album.images[0]" class="ml-5">
          <img
            :src="searchedTrack.album.images[0].url"
            width="70px"
            height="70x"
            alt="ResultTrackImage"
          />
        </div>
        <div class="flex flex-col items-center mt-5 ml-5">
          <h1 class="text-2xl">{{ searchedTrack.name }}</h1>
          <h1 class="mt-6 text-lg">{{ searchedTrack.artists[0].name }}</h1>
        </div>
        <div
          class="flex items-center px-3 py-1 mt-2 ml-5 rounded"
          style="background-color: #282828"
          onMouseOver="this.style.background='#383838'"
          onMouseOut="this.style.background='#282828'"
          @click="play(searchedTrack.uri)"
        >
          <h1 class="text-sm">Play</h1>
        </div>
        <div
          class="flex items-center px-3 py-1 ml-5 rounded"
          style="background-color: #282828"
          onMouseOver="this.style.background='#383838'"
          onMouseOut="this.style.background='#282828'"
          @click="addToQueue(searchedTrack.uri)"
        >
          <h1 class="text-sm">Add to queue</h1>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col mr-5 overflow-y-auto"
      style="min-width: 550px; height: 300px; background-color: #181818"
    >
      <div
        class="flex py-5 mt-5 ml-5 transition duration-100 ease-in-out rounded cursor-pointer"
        onMouseOver="this.style.background='#282828'"
        onMouseOut="this.style.background='#282828'"
        style="width: 500px"
      >
        <div class="flex items-center ml-5">
          <h1 class="text-3xl">No Tracks</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tracks: [],
    }
  },
  computed: {
    ...mapGetters(['searchedTracks']),
  },
  methods: {
    async play(uri) {
      const auth = this.$auth.strategy.token.get()
      const data = {
        uris: [uri],
      }
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(data),
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully playing')
          await this.$store.dispatch('loadPlaylists')
        } else {
          this.$toast.error('Failed to play', { duration: 2500 })
        }
      })
    },
    async addToQueue(uri) {
      const auth = this.$auth.strategy.token.get()
      await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
        method: 'POST',
        headers: {
          Authorization: auth,
        },
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully added')
          await this.$store.dispatch('loadPlaylists')
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
        }
      })
    },
  },
}
</script>
