<template>
  <nav
    class="flex items-center flex-wrap justify-between fixed bottom-0 w-screen min-h-24"
    style="background-color: #282828"
  >
    <CurrentTrackPlayerController class="ml-5 flex-1" :player="player" />
    <PlayerControllerPanel class="flex-1" :player="player" />
    <Volume class="mr-5 flex-1" :player="player" />
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
}
</style>
