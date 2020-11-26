<template>
  <div class="mx-6">
    <h1 class="mb-5 my-5 text-2xl">Playlists</h1>
    <div
      v-if="playlist"
      class="flex flex-col mr-5 overflow-y-auto"
      style="min-width: 550px; height: 300px; background-color: #181818"
    >
      <div
        v-for="playlist in playlist"
        :key="playlist.id"
        class="flex ml-5 py-5 mt-5 transition rounded duration-100 ease-in-out cursor-pointer"
        onMouseOver="this.style.background='#282828'"
        onMouseOut="this.style.background='#181818'"
        style="width: 500px"
        @click="playlistURL(playlist.id)"
      >
        <div v-if="playlist.images[0]" class="ml-5">
          <img :src="playlist.images[0].url" width="70px" alt="" />
        </div>
        <div class="flex items-center ml-5">
          <h1 class="text-3xl">{{ playlist.name }}</h1>
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
        onMouseOut="this.style.background='#181818'"
        style="width: 500px"
      >
        <div class="flex items-center ml-5">
          <h1 class="text-3xl">No Playlists</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['playlist'],
  methods: {
    playlistURL(key) {
      location.href = `https://open.spotify.com/playlist/${key}`
    },
  },
}
</script>
