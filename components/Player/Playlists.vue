<template>
  <div class="mx-6">
    <h1 class="my-5 mb-5 text-2xl">Playlists</h1>
    <div
      v-if="playlists"
      class="flex flex-col w-full mr-5 overflow-y-auto h-3/4"
      style="background-color: #181818"
    >
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="flex w-full py-5 mt-4 transition duration-100 ease-in-out rounded cursor-pointer"
        onMouseOver="this.style.background='#282828'"
        onMouseOut="this.style.background='#181818'"
        @click="playlistURL(playlist.id)"
      >
        <div v-if="playlist.images && playlist.images[0]" class="ml-5">
          <img
            :src="playlist.images[0].url"
            width="70px"
            height="70px"
            alt="PlaylistImage"
          />
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
        class="flex py-5 mt-5 ml-5 transition duration-100 ease-in-out rounded cursor-pointer"
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
  props: ['playlists'],
  methods: {
    playlistURL(key) {
      location.href =
        // `http://localhost:3000/playlist/${key}`
        `https://nuxify.vercel.app/playlist/${key}`
    },
  },
}
</script>
