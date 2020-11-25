<template>
  <div
    v-if="!player.is_playing"
    class="transition py-2 px-2 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#9a9a9a'"
    onMouseOut="this.style.background='#282828'"
    @click="play"
  >
    ►
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
  methods: {
    async play() {
      const auth = this.$auth.strategy.token.get()
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: auth,
        },
      }).then(async () => {
        await this.$store.dispatch('load')
      })
    },
  },
}
</script>
