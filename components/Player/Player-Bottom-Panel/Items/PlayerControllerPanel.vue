<template>
  <div
    v-if="player"
    class="flex items-center justify-center"
    style="height: 80px"
  >
    <PreviousTrack :player="player" />
    <Play :player="player" class="mx-5" />
    <Pause :player="player" class="mx-5" />
    <NextTrack :player="player" />
  </div>
</template>

<script>
import Play from './Player-Options/Play'
import Pause from './Player-Options/Pause'
import PreviousTrack from './Player-Options/PreviousTrack'
import NextTrack from './Player-Options/NextTrack'
export default {
  components: {
    Play,
    Pause,
    PreviousTrack,
    NextTrack,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
}
</script>
