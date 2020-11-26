<template>
  <input
    v-model="volume"
    class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
    type="range"
    min="0"
    max="100"
    step="1"
    @change="setVolume"
  />
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
  data() {
    return {
      volume: this.player.device.volume_percent,
    }
  },
  methods: {
    async setVolume() {
      const auth = this.$auth.strategy.token.get()
      await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${this.volume}`,
        {
          method: 'PUT',
          headers: {
            Authorization: auth,
          },
        }
      ).then(async () => {
        await this.$store.dispatch('loadPlayer')
      })
    },
  },
}
</script>
