<template>
  <div
    v-if="player && player.item && player.device"
    class="flex items-center"
    style="height: 80px"
  >
    <div class="ml-3">
      <img
        :src="player.item.album.images[0].url"
        width="50px"
        alt="TrackImage"
        height="50px"
      />
    </div>
    <div class="ml-3">
      <h1>{{ player.item.name }}</h1>
      <div
        v-for="artist in player.item.artists"
        :key="artist.id"
        class="mr-5 text-xs text-gray-400"
      >
        <h2>{{ artist.name }}</h2>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col justify-evenly" style="height: 80px">
    <div class="ml-5">
      <h1 class="text-lg">Currently Nothing Playing</h1>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
}
</script>
