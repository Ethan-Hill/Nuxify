<template>
  <div class="flex justify-end">
    <input
      v-if="player.device"
      :value="player.device.volume_percent"
      class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3"
      type="range"
      min="0"
      max="100"
      step="1"
      @change="setVolume($event)"
    />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
  methods: {
    async setVolume(e) {
      const auth = this.$auth.strategy.token.get()
      await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`,
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
