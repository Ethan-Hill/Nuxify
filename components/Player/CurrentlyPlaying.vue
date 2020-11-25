<template>
  <div>
    <h1 class="mb-5 text-2xl">Currently Playing</h1>
    <div
      v-if="player.item"
      class="flex flex-col mb-2 justify-evenly mr-5 transition duration-100 ease-in-out cursor-pointer"
      style="width: 550px; height: 300px; background-color: #181818"
      onMouseOver="this.style.background='#282828'"
      onMouseOut="this.style.background='#181818'"
      @click="songURL"
    >
      <div class="ml-5">
        <img :src="player.item.album.images[0].url" width="150px" alt="" />
      </div>
      <div class="ml-5">
        <h1 class="text-3xl">{{ player.item.name }}</h1>
        <h2>{{ player.item.artists[0].name }}</h2>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col justify-evenly mr-5"
      style="width: 550px; height: 300px; background-color: #181818"
    >
      <div class="ml-5">
        <h1 class="text-3xl">Currently Nothing Playing</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
  methods: {
    songURL() {
      location.href = this.player.item.external_urls.spotify
    },
  },
}
</script>
