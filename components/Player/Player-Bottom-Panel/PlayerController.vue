<template>
  <nav
    class="fixed bottom-0 flex flex-wrap items-center justify-between w-screen min-h-24"
    style="background-color: #282828"
  >
    <CurrentTrackPlayerController
      v-if="player && player.device"
      class="flex-1 ml-5"
      :player="player"
    />
    <PlayerControllerPanel
      v-if="player && player.device"
      class="flex-1"
      :player="player"
    />
    <Volume
      v-if="player && player.device"
      class="flex-1 mr-5"
      :player="player"
    />
  </nav>
</template>

<script>
import CurrentTrackPlayerController from './Items/CurrentTrackPlayerController'
import PlayerControllerPanel from './Items/PlayerControllerPanel'
import Volume from './Items/Volume'
export default {
  components: {
    CurrentTrackPlayerController,
    PlayerControllerPanel,
    Volume,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
}
</script>

<style>
div {
  font-family: GothamPro;
  font-display: swap;
}
</style>
