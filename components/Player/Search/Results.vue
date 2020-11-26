<template>
  <div>
    <h1 class="mb-5 text-2xl">Tracks</h1>
    <div
      v-if="tracks"
      class="flex flex-wrap mb-24 justify-around overflow-y-auto"
      style="width: 1300px; height: 400px; background-color: #181818"
    >
      <div
        v-for="searchedTrack in searchedTracks"
        :key="searchedTrack.id"
        class="flex flex-col justify-around items-center ml-5 py-5 my-3 transition rounded duration-100 ease-in-out cursor-pointer text-center"
        onMouseOver="this.style.background='#282828'"
        onMouseOut="this.style.background='#181818'"
        style="width: 300px; min-height: 350px"
      >
        <div v-if="searchedTrack.album.images[0]" class="ml-5">
          <img :src="searchedTrack.album.images[0].url" width="70px" alt="" />
        </div>
        <div class="flex flex-col items-center mt-5 ml-5">
          <h1 class="text-3xl">{{ searchedTrack.name }}</h1>
          <h1 class="text-lg mt-6">{{ searchedTrack.artists[0].name }}</h1>
        </div>
        <div
          class="flex items-center mt-5 ml-5 py-1 px-3 rounded"
          style="background-color: #282828"
          onMouseOver="this.style.background='#383838'"
          onMouseOut="this.style.background='#282828'"
          @click="play(searchedTrack.uri)"
        >
          <h1 class="text-sm">Play</h1>
        </div>
        <div
          class="flex items-center ml-5 py-1 px-3 rounded"
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
        class="flex ml-5 py-5 mt-5 transition rounded duration-100 ease-in-out cursor-pointer"
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
        await this.$store.dispatch('loadPlayer')
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
        await this.$store.dispatch('loadPlayer')
      })
    },
  },
}
</script>
