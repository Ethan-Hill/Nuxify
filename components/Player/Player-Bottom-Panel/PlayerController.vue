<template>
  <nav
    class="flex items-center flex-wrap justify-center fixed bottom-0 w-screen min-h-24"
    style="background-color: #282828"
  >
    <CurrentTrackPlayerController class="mr-auto" :player="player" />
    <PlayerControllerPanel class="mr-auto" :player="player" />
  </nav>
</template>

<script>
import CurrentTrackPlayerController from './Items/CurrentTrackPlayerController'
import PlayerControllerPanel from './Items/PlayerControllerPanel'
export default {
  components: {
    CurrentTrackPlayerController,
    PlayerControllerPanel,
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
