<template>
  <div
    v-if="!player.is_playing"
    class="transition py-2 px-2 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#9a9a9a'"
    onMouseOut="this.style.background='#282828'"
    @click="play"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 172 172"
      style="fill: #000000"
    >
      <g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g fill="#ffffff">
          <path
            d="M34.4,18.06v135.88l5.16,-3.01l105.2425,-61.92l5.0525,-3.01l-5.0525,-3.01l-105.2425,-61.92zM41.28,30.1l94.9225,55.9l-94.9225,55.9z"
          ></path>
        </g>
      </g>
    </svg>
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
        await this.$store.dispatch('loadPlayer')
      })
    },
  },
}
</script>
