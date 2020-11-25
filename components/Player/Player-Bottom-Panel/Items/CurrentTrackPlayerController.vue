<template>
  <div>
    <div
      v-if="player.item"
      class="flex items-center mr-5"
      style="width: 500px; height: 80px"
    >
      <div class="ml-3">
        <img :src="player.item.album.images[0].url" width="50px" alt="" />
      </div>
      <div class="ml-3">
        <h1>{{ player.item.name }}</h1>
        <h2>{{ player.item.artists[0].name }}</h2>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col justify-evenly mr-5"
      style="width: 300px; height: 120px; background-color: #181818"
    >
      <div class="ml-5">
        <h1 class="text-lg">Currently Nothing Playing</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
}
</script>
