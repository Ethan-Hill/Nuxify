<template>
  <div>
    <h1 class="mb-5 text-2xl">Currently Playing</h1>
    <div
      class="flex flex-col justify-evenly mr-5"
      style="width: 550px; height: 300px; background-color: #181818"
    >
      <div class="ml-5">
        <img :src="player.item.album.images[0].url" width="100px" alt="" />
      </div>
      <div class="ml-5">
        <h1 class="text-3xl">{{ player.item.album.name }}</h1>
        <h2>{{ player.item.artists[0].name }}</h2>
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
